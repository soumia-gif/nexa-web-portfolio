import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/upload
// @desc    Upload an image or document (CV)
// @access  Private (Admin)
router.post('/', protect, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'لم يتم إرسال أي ملف',
      });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    return res.status(200).json({
      success: true,
      message: 'تم رفع الملف بنجاح',
      url: fileUrl,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'فشل رفع الملف: ' + error.message,
    });
  }
});

export default router;
