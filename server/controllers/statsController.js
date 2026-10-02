import { Project as DefaultProject } from '../models/Project.js';
import { Skill as DefaultSkill } from '../models/Skill.js';
import { Message as DefaultMessage } from '../models/Message.js';

// @desc    Get dashboard overview statistics
// @route   GET /api/stats
// @access  Private (Admin)
export const getStats = async (req, res) => {
  try {
    const Project = req.models?.Project || DefaultProject;
    const Skill = req.models?.Skill || DefaultSkill;
    const Message = req.models?.Message || DefaultMessage;

    const [
      totalProjects,
      flagshipProjects,
      totalSkills,
      totalMessages,
      unreadMessages,
      recentMessages,
      recentProjects,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ flagship: true }),
      Skill.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ isRead: false }),
      Message.find().sort({ createdAt: -1 }).limit(5),
      Project.find().select('title category flagship createdAt image').sort({ createdAt: -1 }).limit(5),
    ]);

    return res.json({
      success: true,
      data: {
        totalProjects,
        flagshipProjects,
        totalSkills,
        totalMessages,
        unreadMessages,
        recentMessages,
        recentProjects,
      },
    });
  } catch (error) {
    console.error('getStats error:', error);
    return res.status(500).json({
      success: false,
      message: 'فشل استرجاع إحصائيات لوحة التحكم',
    });
  }
};
