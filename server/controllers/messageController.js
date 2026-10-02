import { Message as DefaultMessage } from '../models/Message.js';

const getModel = (req) => req.models?.Message || DefaultMessage;

// @desc    Submit new contact message
// @route   POST /api/messages
// @access  Public
export const createMessage = async (req, res) => {
  try {
    const Message = getModel(req);
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'يرجى ملء جميع الحقول المطلوبة (الاسم، البريد الإلكتروني، والرسالة)',
      });
    }

    const newMessage = await Message.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject ? subject.trim() : 'رسالة جديدة من الموقع',
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: 'تم إرسال رسالتك بنجاح! شكراً لتواصلك.',
      data: newMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة لاحقاً',
    });
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private (Admin)
export const getMessages = async (req, res) => {
  try {
    const Message = getModel(req);
    const messages = await Message.find().sort({ createdAt: -1 });
    return res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'فشل استرجاع الرسائل',
    });
  }
};

// @desc    Mark message as read / unread
// @route   PATCH /api/messages/:id/read
// @access  Private (Admin)
export const toggleReadMessage = async (req, res) => {
  try {
    const Message = getModel(req);
    const { id } = req.params;
    const msg = await Message.findById(id);

    if (!msg) {
      return res.status(404).json({ success: false, message: 'الرسالة غير موجودة' });
    }

    msg.isRead = req.body.isRead !== undefined ? req.body.isRead : !msg.isRead;
    await msg.save();

    return res.json({
      success: true,
      data: msg,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'فشل تحديث حالة الرسالة',
    });
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private (Admin)
export const deleteMessage = async (req, res) => {
  try {
    const Message = getModel(req);
    const { id } = req.params;
    const msg = await Message.findById(id);

    if (!msg) {
      return res.status(404).json({ success: false, message: 'الرسالة غير موجودة' });
    }

    await Message.findByIdAndDelete(id);
    return res.json({
      success: true,
      message: 'تم حذف الرسالة بنجاح',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'فشل حذف الرسالة',
    });
  }
};
