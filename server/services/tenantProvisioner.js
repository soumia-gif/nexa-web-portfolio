import { User } from '../models/User.js';
import { getTenantConnection, getTenantModels } from '../config/connectionManager.js';
import { env } from '../config/env.js';
import {
  getDefaultProfile,
  getDefaultSettings,
  getDefaultProjects,
  getDefaultSkills,
} from '../data/defaultTenantSeed.js';

/**
 * Normalizes a string into a clean, safe MongoDB database name / slug.
 * @param {string} input
 * @returns {string}
 */
export const sanitizeTenantSlug = (input) => {
  return String(input || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 30);
};

/**
 * Builds a dedicated MongoDB URI for a given tenant.
 * @param {string} tenantId
 * @returns {string}
 */
export const buildTenantDbUri = (tenantId) => {
  const fullUri = env.MONGO_URI;
  const match = fullUri.match(/^(mongodb(?:\+srv)?:\/\/[^/?]+)(?:\/([^?]*))?(\?.*)?$/);
  if (match) {
    const hostPart = match[1];
    const queryPart = match[3] || '';
    return `${hostPart}/portfolio_tenant_${tenantId}${queryPart}`;
  }
  return `mongodb://127.0.0.1:27017/portfolio_tenant_${tenantId}`;
};

/**
 * Seeds a newly created tenant database with fresh default documents.
 * @param {mongoose.Connection} tenantConn
 * @param {Object} userData - { username, email, fullName, ... }
 */
export const seedTenantDatabase = async (tenantConn, userData = {}) => {
  const { Profile, Settings, Project, Skill } = getTenantModels(tenantConn);

  // 1. Profile
  const existingProfile = await Profile.findOne();
  if (!existingProfile) {
    const defaultProfile = getDefaultProfile(userData);
    await Profile.create(defaultProfile);
    console.log(`👤 [Tenant Provisioner] Initialized Profile for tenant [${userData.username}]`);
  }

  // 2. Settings
  const existingSettings = await Settings.findOne();
  if (!existingSettings) {
    const defaultSettings = getDefaultSettings();
    await Settings.create(defaultSettings);
    console.log(`⚙️ [Tenant Provisioner] Initialized Settings for tenant [${userData.username}]`);
  }

  // 3. Projects
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    const defaultProjects = getDefaultProjects();
    await Project.insertMany(defaultProjects);
    console.log(`📁 [Tenant Provisioner] Seeded ${defaultProjects.length} initial projects.`);
  }

  // 4. Skills
  const skillCount = await Skill.countDocuments();
  if (skillCount === 0) {
    const defaultSkills = getDefaultSkills();
    await Skill.insertMany(defaultSkills);
    console.log(`⚡ [Tenant Provisioner] Seeded ${defaultSkills.length} initial skills.`);
  }
};

/**
 * Provisions a complete, isolated tenant database and creates the Master User account.
 * @param {Object} params - { username, email, password, fullName, customDbUri, role }
 * @returns {Promise<{ user: Object, tenantId: string, dbUri: string }>}
 */
export const provisionNewTenant = async ({
  username,
  email,
  password,
  fullName,
  customDbUri,
  role = 'admin',
}) => {
  if (!username || !email || !password) {
    throw new Error('Username, email, and password are required');
  }

  const cleanUsername = username.trim();
  const cleanEmail = email.toLowerCase().trim();

  // 1. Check uniqueness in Master User DB
  const existingUser = await User.findOne({
    $or: [{ email: cleanEmail }, { username: cleanUsername }],
  });

  if (existingUser) {
    if (existingUser.email === cleanEmail) {
      throw new Error('هذا البريد الإلكتروني مسجل بالفعل');
    }
    throw new Error('اسم المستخدم هذا محجوز بالفعل، يرجى اختيار اسم آخر');
  }

  // 2. Compute unique tenant identifier and dedicated dbUri
  let tenantId = sanitizeTenantSlug(cleanUsername);
  if (!tenantId || tenantId.length < 2) {
    tenantId = `tenant_${Date.now().toString(36)}`;
  }

  // Check if tenantId happens to clash in Master DB
  const existingTenant = await User.findOne({ tenantId });
  if (existingTenant) {
    tenantId = `${tenantId}_${Date.now().toString().slice(-4)}`;
  }

  const dbUri = customDbUri || buildTenantDbUri(tenantId);

  // 3. Connect to the isolated tenant database
  console.log(`🚀 [Tenant Provisioner] Creating & connecting to isolated DB: ${dbUri}`);
  const tenantConn = await getTenantConnection(tenantId, dbUri);

  // 4. Auto-seed default templates into the new tenant DB
  await seedTenantDatabase(tenantConn, {
    username: cleanUsername,
    email: cleanEmail,
    fullName: fullName || cleanUsername,
  });

  // 5. Create user account in Master DB pointing to their tenant DB
  const user = await User.create({
    username: cleanUsername,
    email: cleanEmail,
    password,
    role,
    tenantId,
    dbUri,
    status: 'active',
  });

  console.log(`👑 [Tenant Provisioner] Successfully provisioned tenant [${tenantId}] for user [${cleanUsername}]`);

  return {
    user,
    tenantId,
    dbUri,
  };
};
