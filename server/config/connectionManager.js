import mongoose from 'mongoose';
import { env } from './env.js';
import { projectSchema } from '../models/Project.js';
import { profileSchema } from '../models/Profile.js';
import { skillSchema } from '../models/Skill.js';
import { settingsSchema } from '../models/Settings.js';
import { messageSchema } from '../models/Message.js';

// In-Memory Connection & Models Cache
const tenantConnections = new Map();
const tenantModelsCache = new Map();

/**
 * Initializes and binds Mongoose schemas to a specific tenant connection.
 * @param {mongoose.Connection} connection
 * @returns {Object} map of tenant models
 */
export const initTenantModels = (connection) => {
  return {
    Project: connection.models['Project'] || connection.model('Project', projectSchema),
    Profile: connection.models['Profile'] || connection.model('Profile', profileSchema),
    Skill: connection.models['Skill'] || connection.model('Skill', skillSchema),
    Settings: connection.models['Settings'] || connection.model('Settings', settingsSchema),
    Message: connection.models['Message'] || connection.model('Message', messageSchema),
  };
};

/**
 * Retrieves an existing cached Mongoose connection for a tenant or creates a new one.
 * @param {string} tenantId - Unique identifier of the tenant
 * @param {string} dbUri - MongoDB connection URI for the tenant's dedicated database
 * @returns {Promise<mongoose.Connection>}
 */
export const getTenantConnection = async (tenantId, dbUri) => {
  const normalizedId = String(tenantId || 'default').toLowerCase().trim();
  const effectiveUri = dbUri || env.MONGO_URI;

  // 1. Check if an active connection already exists in cache
  if (tenantConnections.has(normalizedId)) {
    const existingConn = tenantConnections.get(normalizedId);
    // readyState: 1 = connected, 2 = connecting
    if (existingConn.readyState === 1 || existingConn.readyState === 2) {
      if (existingConn.readyState === 2) {
        await existingConn.asPromise();
      }
      return existingConn;
    }
    // If connection dropped or closed, remove from cache and recreate
    tenantConnections.delete(normalizedId);
    tenantModelsCache.delete(normalizedId);
  }

  // 2. Create new isolated connection pool for this tenant
  const connection = mongoose.createConnection(effectiveUri, {
    maxPoolSize: 10,
    minPoolSize: 1,
    serverSelectionTimeoutMS: 8000,
  });

  // Attach connection lifecycle events
  connection.on('connected', () => {
    console.log(`📡 [Tenant DB Manager] Connected to tenant [${normalizedId}] -> DB: ${connection.name}`);
  });

  connection.on('error', (err) => {
    console.error(`❌ [Tenant DB Manager] Error on tenant [${normalizedId}]:`, err.message);
  });

  connection.on('disconnected', () => {
    console.warn(`⚠️ [Tenant DB Manager] Tenant [${normalizedId}] disconnected. Removing from cache.`);
    tenantConnections.delete(normalizedId);
    tenantModelsCache.delete(normalizedId);
  });

  // Wait for initial connection resolution
  await connection.asPromise();

  // 3. Register all schemas on this tenant connection
  const models = initTenantModels(connection);

  // 4. Cache connection and models
  tenantConnections.set(normalizedId, connection);
  tenantModelsCache.set(normalizedId, models);

  return connection;
};

/**
 * Returns tenant-specific models for an active connection or tenant ID.
 * @param {mongoose.Connection|string} connectionOrTenantId
 * @returns {Object} { Project, Profile, Skill, Settings, Message }
 */
export const getTenantModels = (connectionOrTenantId) => {
  if (typeof connectionOrTenantId === 'string') {
    const normalizedId = connectionOrTenantId.toLowerCase().trim();
    if (tenantModelsCache.has(normalizedId)) {
      return tenantModelsCache.get(normalizedId);
    }
  } else if (connectionOrTenantId && typeof connectionOrTenantId.model === 'function') {
    return initTenantModels(connectionOrTenantId);
  }

  throw new Error('Tenant models not found or connection not initialized');
};

/**
 * Cleanly closes an active tenant connection and evicts it from cache.
 * @param {string} tenantId
 */
export const closeTenantConnection = async (tenantId) => {
  const normalizedId = String(tenantId).toLowerCase().trim();
  if (tenantConnections.has(normalizedId)) {
    const conn = tenantConnections.get(normalizedId);
    tenantConnections.delete(normalizedId);
    tenantModelsCache.delete(normalizedId);
    await conn.close();
    console.log(`🔌 [Tenant DB Manager] Closed connection for tenant [${normalizedId}]`);
  }
};

/**
 * Get snapshot of active tenant connections
 */
export const getActiveTenantPoolStats = () => {
  const stats = [];
  for (const [id, conn] of tenantConnections.entries()) {
    stats.push({
      tenantId: id,
      database: conn.name,
      host: conn.host,
      port: conn.port,
      readyState: conn.readyState,
    });
  }
  return stats;
};
