import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { env } from '../config/env.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res
          .status(401)
          .json({ success: false, message: 'مستخدم غير موجود أو تم إلغاؤه' });
      }

      return next();
    } catch (error) {
      console.error('Auth verification error:', error.message);
      return res
        .status(401)
        .json({ success: false, message: 'جلسة تسجيل الدخول غير صالحة أو منتهية' });
    }
  }

  return res
    .status(401)
    .json({ success: false, message: 'يرجى تسجيل الدخول للوصول إلى هذا المسار' });
};
