import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { getTenantConnection, getTenantModels } from '../config/connectionManager.js';
import { env } from '../config/env.js';

/**
 * Tenant Resolution Middleware.
 * Resolves the appropriate tenant database for the incoming request,
 * establishes/retrieves the cached Mongoose connection, and attaches
 * `req.tenantId`, `req.tenantDb`, and `req.models` to the request object.
 */
export const tenantMiddleware = async (req, res, next) => {
  try {
    let tenantId = null;
    let dbUri = null;

    // 1. If request has Bearer JWT token, resolve tenant from authenticated user
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, env.JWT_SECRET);
        if (decoded && decoded.id) {
          const authUser = await User.findById(decoded.id).select('tenantId dbUri status');
          if (authUser && authUser.status !== 'suspended') {
            tenantId = authUser.tenantId;
            dbUri = authUser.dbUri;
          }
        }
      } catch (err) {
        // Token might be expired or malformed; continue to header/query fallback
      }
    }

    // 2. If req.user was already set by another middleware:
    if (!tenantId && req.user && req.user.tenantId) {
      tenantId = req.user.tenantId;
      dbUri = req.user.dbUri;
    }

    // 2. If not authenticated, inspect headers, query params, or subdomain
    if (!tenantId) {
      const headerTenant = req.headers['x-tenant-id'] || req.headers['x-tenant'];
      const queryTenant = req.query?.tenant;
      const subdomainTenant = req.subdomains && req.subdomains.length > 0 ? req.subdomains[0] : null;

      tenantId = (headerTenant || queryTenant || subdomainTenant || '').toString().toLowerCase().trim();
    }

    // 3. If a specific tenantId was requested, look up its dedicated dbUri in Master DB
    if (tenantId && tenantId !== 'default') {
      const tenantUser = await User.findOne({
        $or: [{ tenantId }, { username: tenantId }],
        status: { $ne: 'suspended' },
      }).select('tenantId dbUri');

      if (tenantUser) {
        tenantId = tenantUser.tenantId;
        dbUri = tenantUser.dbUri;
      } else {
        // If specified tenant not found in Master DB
        return res.status(404).json({
          success: false,
          message: `المستأجر المطلوب [${tenantId}] غير موجود أو غير مفعل`,
        });
      }
    }

    // 4. Default / Fallback tenant (for standalone portfolio or master default)
    if (!tenantId || tenantId === 'default') {
      tenantId = 'default';
      dbUri = env.MONGO_URI;
    }

    // 5. Retrieve or create the cached isolated connection
    const tenantConn = await getTenantConnection(tenantId, dbUri);

    // 6. Attach connection and tenant-bound models to req
    req.tenantId = tenantId;
    req.tenantDb = tenantConn;
    req.models = getTenantModels(tenantConn);

    return next();
  } catch (error) {
    console.error('❌ [Tenant Middleware Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'فشل تهيئة الاتصال بقاعدة بيانات المستأجر: ' + error.message,
    });
  }
};
