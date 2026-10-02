import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import { SocialLinkItem } from '../../types';
import {
  Share2,
  Plus,
  Trash2,
  Edit2,
  Check,
  AlertCircle,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Facebook,
  Globe,
  Code2,
  Send,
  Save,
} from 'lucide-react';

interface PlatformPreset {
  platform: string;
  name: string;
  iconName: string;
  defaultUrl: string;
  color: string;
}

const PLATFORM_PRESETS: PlatformPreset[] = [
  { platform: 'github', name: 'GitHub', iconName: 'github', defaultUrl: 'https://github.com/', color: 'hover:text-white hover:border-slate-400' },
  { platform: 'linkedin', name: 'LinkedIn', iconName: 'linkedin', defaultUrl: 'https://linkedin.com/in/', color: 'hover:text-blue-400 hover:border-blue-500' },
  { platform: 'twitter', name: 'Twitter / X', iconName: 'twitter', defaultUrl: 'https://x.com/', color: 'hover:text-sky-400 hover:border-sky-500' },
  { platform: 'instagram', name: 'Instagram', iconName: 'instagram', defaultUrl: 'https://instagram.com/', color: 'hover:text-pink-400 hover:border-pink-500' },
  { platform: 'youtube', name: 'YouTube', iconName: 'youtube', defaultUrl: 'https://youtube.com/@', color: 'hover:text-red-500 hover:border-red-600' },
  { platform: 'facebook', name: 'Facebook', iconName: 'facebook', defaultUrl: 'https://facebook.com/', color: 'hover:text-blue-500 hover:border-blue-600' },
  { platform: 'leetcode', name: 'LeetCode', iconName: 'code2', defaultUrl: 'https://leetcode.com/u/', color: 'hover:text-amber-400 hover:border-amber-500' },
  { platform: 'telegram', name: 'Telegram', iconName: 'send', defaultUrl: 'https://t.me/', color: 'hover:text-cyan-400 hover:border-cyan-500' },
  { platform: 'other', name: 'Website / Other', iconName: 'globe', defaultUrl: 'https://', color: 'hover:text-emerald-400 hover:border-emerald-500' },
];

export const getSocialIcon = (iconName: string, className = 'w-4 h-4') => {
  switch (iconName?.toLowerCase()) {
    case 'github':
      return <Github className={className} />;
    case 'linkedin':
      return <Linkedin className={className} />;
    case 'twitter':
      return <Twitter className={className} />;
    case 'instagram':
      return <Instagram className={className} />;
    case 'youtube':
      return <Youtube className={className} />;
    case 'facebook':
      return <Facebook className={className} />;
    case 'code2':
    case 'leetcode':
      return <Code2 className={className} />;
    case 'send':
    case 'telegram':
      return <Send className={className} />;
    default:
      return <Globe className={className} />;
  }
};

export const AdminSocialLinks: React.FC = () => {
  const { language } = useLanguage();
  const [socials, setSocials] = useState<SocialLinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Modal / Form state for Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<SocialLinkItem>({
    platform: 'github',
    title: 'GitHub',
    url: '',
    icon: 'github',
    enabled: true,
    order: 0,
  });

  const fetchSocials = async () => {
    try {
      setLoading(true);
      const res = await api.getProfile();
      if (res.success && res.data) {
        if (res.data.socialLinksList && res.data.socialLinksList.length > 0) {
          setSocials(res.data.socialLinksList);
        } else {
          // Fallback to defaults
          setSocials([
            { platform: 'github', title: 'GitHub', url: res.data.socialLinks?.github || 'https://github.com/', icon: 'github', enabled: true, order: 1 },
            { platform: 'linkedin', title: 'LinkedIn', url: res.data.socialLinks?.linkedin || 'https://linkedin.com/', icon: 'linkedin', enabled: true, order: 2 },
            { platform: 'twitter', title: 'Twitter / X', url: res.data.socialLinks?.twitter || '', icon: 'twitter', enabled: true, order: 3 },
          ]);
        }
      }
    } catch (err: any) {
      setErrorMsg('Failed to load social links');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setFormData({
      platform: 'github',
      title: 'GitHub',
      url: 'https://github.com/',
      icon: 'github',
      enabled: true,
      order: socials.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (index: number) => {
    setEditingIndex(index);
    setFormData({ ...socials[index] });
    setIsModalOpen(true);
  };

  const handleSelectPreset = (preset: PlatformPreset) => {
    setFormData((prev) => ({
      ...prev,
      platform: preset.platform,
      title: preset.name,
      icon: preset.iconName,
      url: prev.url && prev.url !== 'https://' ? prev.url : preset.defaultUrl,
    }));
  };

  const saveToServer = async (newSocials: SocialLinkItem[]) => {
    try {
      setSaving(true);
      setErrorMsg('');
      const res = await api.updateSocialLinks(newSocials);
      if (res.success) {
        setSuccessMsg(
          language === 'ar'
            ? 'تم حفظ وتحديث روابط التواصل الاجتماعي بنجاح في قاعدة البيانات!'
            : 'Social links saved to database successfully!'
        );
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setErrorMsg(res.message || 'Failed to save');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error saving to server');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url.trim()) {
      setErrorMsg(language === 'ar' ? 'يرجى إدخال الرابط URL' : 'Please provide a valid URL');
      return;
    }

    let updated: SocialLinkItem[];
    if (editingIndex !== null) {
      // Update
      updated = [...socials];
      updated[editingIndex] = { ...formData };
    } else {
      // Add
      updated = [...socials, { ...formData, order: socials.length + 1 }];
    }
    setSocials(updated);
    setIsModalOpen(false);
    await saveToServer(updated);
  };

  const handleDelete = async (index: number) => {
    const confirmText =
      language === 'ar'
        ? 'هل أنت متأكد من حذف هذه المنصة؟'
        : 'Are you sure you want to delete this social link?';
    if (window.confirm(confirmText)) {
      const updated = socials.filter((_, i) => i !== index);
      setSocials(updated);
      await saveToServer(updated);
    }
  };

  const handleToggleEnabled = async (index: number) => {
    const updated = [...socials];
    updated[index].enabled = !updated[index].enabled;
    setSocials(updated);
    await saveToServer(updated);
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === socials.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...socials];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // re-index order
    updated.forEach((item, idx) => {
      item.order = idx + 1;
    });

    setSocials(updated);
    await saveToServer(updated);
  };

  const handleSaveAll = async () => {
    try {
      setSaving(true);
      setErrorMsg('');
      setSuccessMsg('');

      const res = await api.updateSocialLinks(socials);
      if (res.success) {
        setSuccessMsg(
          language === 'ar'
            ? 'تم حفظ وتحديث روابط التواصل الاجتماعي بنجاح!'
            : 'Social links saved successfully!'
        );
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(res.message || 'Failed to save');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error connecting to server');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-slate-400 text-sm">...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-pink-950/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Share2 className="w-7 h-7 text-pink-400" />
            <span>{language === 'ar' ? 'إدارة منصات التواصل الاجتماعي' : language === 'fr' ? 'Réseaux Sociaux' : 'Social Media Links'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {language === 'ar'
              ? 'أضف، عدّل، أو احذف منصات التواصل الاجتماعي الخاصة بك، وتحكم في ظهورها المباشر على الموقع.'
              : 'Add, modify, or reorder your social media channels displayed dynamically on your portfolio.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 shadow-md shadow-pink-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'ar' ? 'إضافة منصة جديدة' : 'Add Social Platform'}</span>
          </button>

          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? '...' : language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-emerald-200 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-950/50 border border-red-800 text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Social Links List */}
      <div className="space-y-3">
        {socials.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#120620]/60 border border-pink-950/80 text-slate-400 text-xs">
            {language === 'ar' ? 'لا توجد منصات تواصل مضافة حالياً. انقر على "إضافة منصة جديدة" للبدء.' : 'No social links configured yet. Click "Add Social Platform" to begin.'}
          </div>
        ) : (
          socials.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                item.enabled
                  ? 'bg-[#120620]/90 border-pink-950/80 shadow-md'
                  : 'bg-[#0d0317]/50 border-pink-950/30 opacity-60'
              }`}
            >
              {/* Left Info */}
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-pink-950/40 text-pink-400 border border-pink-900/40 shrink-0">
                  {getSocialIcon(item.icon, 'w-5 h-5')}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-pink-950/60 border border-pink-900/40 text-pink-300">
                      {item.platform}
                    </span>
                    {!item.enabled && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium">
                        {language === 'ar' ? 'مخفي' : 'Hidden'}
                      </span>
                    )}
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-slate-400 hover:text-pink-300 transition-colors flex items-center gap-1 mt-0.5 truncate max-w-xs sm:max-w-md font-mono"
                  >
                    <span className="truncate">{item.url}</span>
                    <ExternalLink className="w-3 h-3 shrink-0 opacity-60" />
                  </a>
                </div>
              </div>

              {/* Right Action Controls */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                {/* Reorder Buttons */}
                <div className="flex items-center rounded-lg bg-[#0a0312] border border-pink-950/60 p-0.5">
                  <button
                    type="button"
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Move Up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === socials.length - 1}
                    className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Move Down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Visibility Toggle */}
                <button
                  type="button"
                  onClick={() => handleToggleEnabled(index)}
                  className={`p-2 rounded-xl border text-xs flex items-center gap-1 cursor-pointer transition-all ${
                    item.enabled
                      ? 'bg-pink-950/40 text-pink-300 border-pink-800/40 hover:bg-pink-900/50'
                      : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                  title={item.enabled ? 'Hide from public site' : 'Show on public site'}
                >
                  {item.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                {/* Edit Button */}
                <button
                  type="button"
                  onClick={() => handleOpenEdit(index)}
                  className="p-2 rounded-xl bg-purple-950/40 text-purple-300 border border-purple-800/40 hover:bg-purple-900/50 transition-colors cursor-pointer"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="p-2 rounded-xl bg-red-950/40 text-red-300 border border-red-800/40 hover:bg-red-900/50 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#120620] border border-pink-950/90 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Share2 className="w-5 h-5 text-pink-400" />
              <span>
                {editingIndex !== null
                  ? language === 'ar' ? 'تعديل منصة تواصل' : 'Edit Social Platform'
                  : language === 'ar' ? 'إضافة منصة تواصل جديدة' : 'Add Social Platform'}
              </span>
            </h2>

            {/* Quick Presets */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                {language === 'ar' ? 'اختر نوع المنصة السريعة :' : 'Choose Preset Platform:'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PLATFORM_PRESETS.map((p) => (
                  <button
                    key={p.platform}
                    type="button"
                    onClick={() => handleSelectPreset(p)}
                    className={`p-2 rounded-xl border text-xs flex items-center gap-2 transition-all cursor-pointer ${
                      formData.platform === p.platform
                        ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/20 border-pink-500 text-white font-bold'
                        : 'bg-[#0a0312] border-pink-950/70 text-slate-400 hover:text-white hover:border-pink-800'
                    }`}
                  >
                    {getSocialIcon(p.iconName, 'w-3.5 h-3.5')}
                    <span className="truncate">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  {language === 'ar' ? 'اسم المنصة المعروض' : 'Display Title'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. GitHub, Instagram, LeetCode"
                  className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  {language === 'ar' ? 'رابط الصفحة / الحساب (URL)' : 'Profile URL'}
                </label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-white focus:outline-none font-mono"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
                  <input
                    type="checkbox"
                    checked={formData.enabled}
                    onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                    className="w-4 h-4 rounded text-pink-500 bg-[#0a0312] border-pink-950 focus:ring-pink-500"
                  />
                  <span>{language === 'ar' ? 'إظهار هذه المنصة في الموقع للزوار' : 'Show on public site'}</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-pink-950/60">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-400 hover:text-white bg-[#0a0312] border border-pink-950/80 cursor-pointer"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 shadow-md cursor-pointer"
                >
                  {language === 'ar' ? 'حفظ' : 'Confirm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
