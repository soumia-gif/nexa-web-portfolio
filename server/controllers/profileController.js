import { Profile as DefaultProfile } from '../models/Profile.js';

const getModel = (req) => req.models?.Profile || DefaultProfile;

// @desc    Get profile details
// @route   GET /api/profile
// @access  Public
export const getProfile = async (req, res) => {
  try {
    const Profile = getModel(req);
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }

    // Auto-migrate or initialize socialLinksList if empty
    if (!profile.socialLinksList || profile.socialLinksList.length === 0) {
      const initialSocials = [];
      if (profile.socialLinks?.github) {
        initialSocials.push({
          platform: 'github',
          title: 'GitHub',
          url: profile.socialLinks.github,
          icon: 'github',
          enabled: true,
          order: 1,
        });
      }
      if (profile.socialLinks?.linkedin) {
        initialSocials.push({
          platform: 'linkedin',
          title: 'LinkedIn',
          url: profile.socialLinks.linkedin,
          icon: 'linkedin',
          enabled: true,
          order: 2,
        });
      }
      if (profile.socialLinks?.twitter) {
        initialSocials.push({
          platform: 'twitter',
          title: 'Twitter / X',
          url: profile.socialLinks.twitter,
          icon: 'twitter',
          enabled: true,
          order: 3,
        });
      }

      if (initialSocials.length > 0) {
        profile.socialLinksList = initialSocials;
        await profile.save();
      }
    }

    return res.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'فشل استرجاع البيانات الشخصية',
    });
  }
};

// @desc    Update profile details
// @route   PUT /api/profile
// @access  Private (Admin)
export const updateProfile = async (req, res) => {
  try {
    const Profile = getModel(req);
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, {
        new: true,
        runValidators: false,
      });
    }

    return res.json({
      success: true,
      message: 'تم تحديث البيانات الشخصية بنجاح',
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'فشل تحديث البيانات الشخصية: ' + error.message,
    });
  }
};

// @desc    Update social media links list
// @route   PUT /api/profile/social-links
// @access  Private (Admin)
export const updateSocialLinks = async (req, res) => {
  try {
    const Profile = getModel(req);
    const { socialLinksList } = req.body;
    if (!Array.isArray(socialLinksList)) {
      return res.status(400).json({
        success: false,
        message: 'يجب إرسال مصفوفة روابط التواصل الاجتماعي بشكل صحيح',
      });
    }

    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({ socialLinksList });
    } else {
      profile.socialLinksList = socialLinksList;
      await profile.save();
    }

    return res.json({
      success: true,
      message: 'تم حفظ وتحديث روابط التواصل الاجتماعي بنجاح',
      data: profile.socialLinksList,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'فشل تحديث روابط التواصل الاجتماعي: ' + error.message,
    });
  }
};
