import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { provisionNewTenant } from '../services/tenantProvisioner.js';
import { env } from '../config/env.js';

const generateToken = (id, tenantId = 'default', role = 'admin') => {
  return jwt.sign(
    { id, tenantId, role },
    env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const secretGateToken = req.headers['x-admin-secret-gate'] || req.body.secretGate;

    // Validate secret gate token only if an ADMIN_SECRET_KEY is configured in the environment
    if (env.ADMIN_SECRET_KEY && secretGateToken && secretGateToken !== env.ADMIN_SECRET_KEY) {
      return res.status(403).json({
        success: false,
        message: 'البوابة الإدارية مقفلة، يرجى إدخال الرمز السري المعتمد',
      });
    }

    if (!usernameOrEmail || !password) {
      return res.status(400).json({
        success: false,
        message: 'يرجى إدخال اسم المستخدم/البريد الإلكتروني وكلمة المرور',
      });
    }

    const searchVal = usernameOrEmail.trim();

    // Secure, strict search by matching email or username only
    const user = await User.findOne({
      $or: [
        { email: searchVal.toLowerCase() },
        { username: new RegExp(`^${searchVal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
      ],
    });

    if (user && (await user.matchPassword(password))) {
      const tenantId = user.tenantId || 'default';
      const dbUri = user.dbUri || env.MONGO_URI;

      return res.json({
        success: true,
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          tenantId,
          dbUri,
          token: generateToken(user._id, tenantId, user.role),
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: 'بيانات الدخول غير صحيحة، يرجى التأكد والمحاولة مرة أخرى',
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم أثناء تسجيل الدخول',
    });
  }
};

// @desc    Register a new tenant & provision isolated database
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { username, email, password, fullName, customDbUri } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'يرجى إدخال اسم المستخدم، البريد الإلكتروني وكلمة المرور',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
      });
    }

    const { user, tenantId, dbUri } = await provisionNewTenant({
      username,
      email,
      password,
      fullName,
      customDbUri,
      role: 'admin',
    });

    const token = generateToken(user._id, tenantId, user.role);

    return res.status(201).json({
      success: true,
      message: `تم إنشاء حساب المستأجر وقاعدة البيانات المستقلة [${tenantId}] بنجاح`,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        tenantId,
        dbUri,
        token,
      },
    });
  } catch (error) {
    console.error('Registration/Provisioning error:', error);
    return res.status(400).json({
      success: false,
      message: error.message || 'فشل إنشاء الحساب وقاعدة البيانات المستقلة',
    });
  }
};

// @desc    Get current tenant context info
// @route   GET /api/auth/tenant
// @access  Public
export const getTenantInfo = (req, res) => {
  return res.json({
    success: true,
    tenantId: req.tenantId || 'default',
    database: req.tenantDb?.name || 'portfolio_db',
    connectionState: req.tenantDb?.readyState === 1 ? 'connected' : 'connecting/other',
  });
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء جلب بيانات المستخدم',
    });
  }
};

// @desc    Change admin password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'يرجى إدخال كلمة المرور الحالية والجديدة',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل',
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'المستخدم غير موجود' });
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'كلمة المرور الحالية غير صحيحة',
      });
    }

    user.password = newPassword;
    await user.save();

    return res.json({
      success: true,
      message: 'تم تغيير كلمة المرور بنجاح',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء تغيير كلمة المرور',
    });
  }
};

// @desc    Update admin username and email
// @route   PUT /api/auth/update-account
// @access  Private
export const updateAccount = async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username && !email) {
      return res.status(400).json({
        success: false,
        message: 'يرجى إدخال اسم المستخدم أو البريد الإلكتروني الجديد',
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'المستخدم غير موجود' });
    }

    // Check if new username is already taken by another user
    if (username && username.trim() !== user.username) {
      const existingUser = await User.findOne({ username: username.trim() });
      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return res.status(400).json({
          success: false,
          message: 'اسم المستخدم هذا مستخدم بالفعل، يرجى اختيار اسم آخر',
        });
      }
      user.username = username.trim();
    }

    // Check if new email is already taken by another user
    if (email && email.toLowerCase().trim() !== user.email) {
      const existingEmail = await User.findOne({ email: email.toLowerCase().trim() });
      if (existingEmail && existingEmail._id.toString() !== user._id.toString()) {
        return res.status(400).json({
          success: false,
          message: 'هذا البريد الإلكتروني مستخدم بالفعل بحساب آخر',
        });
      }
      user.email = email.toLowerCase().trim();
    }

    await user.save();

    return res.json({
      success: true,
      message: 'تم تحديث بيانات الحساب بنجاح',
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء تحديث بيانات الحساب: ' + error.message,
    });
  }
};
