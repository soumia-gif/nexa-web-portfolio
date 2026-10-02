import express from 'express';
import {
  getProfile,
  updateProfile,
  updateSocialLinks,
} from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProfile)
  .put(protect, updateProfile);

router.route('/social-links')
  .put(protect, updateSocialLinks);

export default router;
