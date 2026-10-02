import { Project as DefaultProject } from '../models/Project.js';

const getModel = (req) => req.models?.Project || DefaultProject;

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    const Project = getModel(req);
    const { category, flagship } = req.query;
    const filter = {};

    if (category && category !== 'All' && category !== 'الكل' && category !== 'Tous') {
      filter.category = category;
    }
    if (flagship !== undefined) {
      filter.flagship = flagship === 'true';
    }

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    return res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error('getProjects error:', error);
    return res.status(500).json({
      success: false,
      message: 'فشل استرجاع المشاريع من الخادم',
    });
  }
};

// @desc    Get single project by ID or slug
// @route   GET /api/projects/:idOrSlug
// @access  Public
export const getProject = async (req, res) => {
  try {
    const Project = getModel(req);
    const { idOrSlug } = req.params;
    let project = null;

    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findById(idOrSlug);
    }
    if (!project) {
      project = await Project.findOne({ slug: idOrSlug });
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'المشروع غير موجود',
      });
    }

    return res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'فشل استرجاع تفاصيل المشروع',
    });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin)
export const createProject = async (req, res) => {
  try {
    const Project = getModel(req);
    const projectData = req.body;

    if (!projectData.title || (!projectData.title.en && !projectData.title.ar)) {
      return res.status(400).json({
        success: false,
        message: 'عنوان المشروع مطلوب (بالإنجليزية أو العربية على الأقل)',
      });
    }

    // Auto-generate slug if not provided
    if (!projectData.slug) {
      const baseTitle = projectData.title.en || projectData.title.ar || 'project';
      projectData.slug =
        baseTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '') +
        '-' +
        Date.now().toString().slice(-4);
    }

    // Check slug uniqueness
    const existing = await Project.findOne({ slug: projectData.slug });
    if (existing) {
      projectData.slug = `${projectData.slug}-${Date.now().toString().slice(-4)}`;
    }

    const project = await Project.create(projectData);
    return res.status(201).json({
      success: true,
      message: 'تم إضافة المشروع بنجاح',
      data: project,
    });
  } catch (error) {
    console.error('createProject error:', error);
    return res.status(500).json({
      success: false,
      message: 'فشل إنشاء المشروع: ' + error.message,
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
export const updateProject = async (req, res) => {
  try {
    const Project = getModel(req);
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'المشروع غير موجود',
      });
    }

    const updated = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.json({
      success: true,
      message: 'تم تحديث المشروع بنجاح',
      data: updated,
    });
  } catch (error) {
    console.error('updateProject error:', error);
    return res.status(500).json({
      success: false,
      message: 'فشل تحديث المشروع: ' + error.message,
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
export const deleteProject = async (req, res) => {
  try {
    const Project = getModel(req);
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'المشروع غير موجود',
      });
    }

    await Project.findByIdAndDelete(id);
    return res.json({
      success: true,
      message: 'تم حذف المشروع بنجاح',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'فشل حذف المشروع',
    });
  }
};
