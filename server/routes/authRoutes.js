import express from 'express';
import {
  login,
  register,
  getMe,
  getTenantInfo,
  changePassword,
  updateAccount,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/tenant', getTenantInfo);
router.get('/me', protect, getMe);
router.put('/change-password', protect, changePassword);
router.put('/update-account', protect, updateAccount);

export default router;
