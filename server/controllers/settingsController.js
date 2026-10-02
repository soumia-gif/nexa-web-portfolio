import { Settings as DefaultSettings } from '../models/Settings.js';

const getModel = (req) => req.models?.Settings || DefaultSettings;

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res) => {
  try {
    const Settings = getModel(req);
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    return res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'فشل استرجاع إعدادات الموقع: ' + error.message,
    });
  }
};

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private (Admin)
export const updateSettings = async (req, res) => {
  try {
    const Settings = getModel(req);
    const { backgroundTheme, sections, cvSettings } = req.body;

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({});
    }

    if (backgroundTheme) {
      settings.backgroundTheme = backgroundTheme;
    }

    if (sections && Array.isArray(sections)) {
      settings.sections = sections;
    }

    if (cvSettings) {
      if (cvSettings.enabled !== undefined) {
        settings.cvSettings.enabled = Boolean(cvSettings.enabled);
      }
      if (cvSettings.fileName) {
        settings.cvSettings.fileName = String(cvSettings.fileName);
      }
      if (cvSettings.title && typeof cvSettings.title === 'object') {
        settings.cvSettings.title = {
          en: cvSettings.title.en || settings.cvSettings.title?.en || 'Curriculum Vitae (CV)',
          fr: cvSettings.title.fr || settings.cvSettings.title?.fr || 'Curriculum Vitae (CV)',
          ar: cvSettings.title.ar || settings.cvSettings.title?.ar || 'السيرة الذاتية (CV)',
        };
      }
      if (cvSettings.description && typeof cvSettings.description === 'object') {
        settings.cvSettings.description = {
          en: cvSettings.description.en || settings.cvSettings.description?.en || '',
          fr: cvSettings.description.fr || settings.cvSettings.description?.fr || '',
          ar: cvSettings.description.ar || settings.cvSettings.description?.ar || '',
        };
      }
    }

    await settings.save();

    return res.json({
      success: true,
      message: 'تم حفظ وتحديث إعدادات الموقع بنجاح',
      data: settings,
    });
  } catch (error) {
    console.error('Settings update error:', error);
    return res.status(500).json({
      success: false,
      message: 'فشل حفظ إعدادات الموقع: ' + error.message,
    });
  }
};
