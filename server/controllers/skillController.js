import { Skill as DefaultSkill } from '../models/Skill.js';

const getModel = (req) => req.models?.Skill || DefaultSkill;

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
export const getSkills = async (req, res) => {
  try {
    const Skill = getModel(req);
    const { category } = req.query;
    const filter = category ? { category } : {};
    const skills = await Skill.find(filter).sort({ order: 1, createdAt: 1 });

    return res.json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'فشل استرجاع المهارات',
    });
  }
};

// @desc    Create new skill
// @route   POST /api/skills
// @access  Private (Admin)
export const createSkill = async (req, res) => {
  try {
    const Skill = getModel(req);
    const { name, category, level, highlight, context, icon, order } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'اسم المهارة مطلوب',
      });
    }

    const skill = await Skill.create({
      name,
      category: category || 'frontend',
      level: level || 'Core',
      highlight: highlight ?? true,
      context: context || { en: '', ar: '', fr: '' },
      icon: icon || 'Code',
      order: order || 0,
    });

    return res.status(201).json({
      success: true,
      message: 'تم إضافة المهارة بنجاح',
      data: skill,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'فشل إضافة المهارة: ' + error.message,
    });
  }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private (Admin)
export const updateSkill = async (req, res) => {
  try {
    const Skill = getModel(req);
    const { id } = req.params;
    const skill = await Skill.findById(id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'المهارة غير موجودة',
      });
    }

    const updated = await Skill.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.json({
      success: true,
      message: 'تم تحديث المهارة بنجاح',
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'فشل تحديث المهارة: ' + error.message,
    });
  }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private (Admin)
export const deleteSkill = async (req, res) => {
  try {
    const Skill = getModel(req);
    const { id } = req.params;
    const skill = await Skill.findById(id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'المهارة غير موجودة',
      });
    }

    await Skill.findByIdAndDelete(id);
    return res.json({
      success: true,
      message: 'تم حذف المهارة بنجاح',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'فشل حذف المهارة',
    });
  }
};
