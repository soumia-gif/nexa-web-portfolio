import express from 'express';
import {
  createMessage,
  getMessages,
  toggleReadMessage,
  deleteMessage,
} from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createMessage)
  .get(protect, getMessages);

router.route('/:id/read')
  .patch(protect, toggleReadMessage);

router.route('/:id')
  .delete(protect, deleteMessage);

export default router;
