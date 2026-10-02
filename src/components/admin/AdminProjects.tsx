import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import { adminTranslations } from '../../data/adminTranslations';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Upload,
  ExternalLink,
  Github,
  X,
  Check,
  Star,
  Image as ImageIcon,
  AlertCircle,
} from 'lucide-react';

interface ProjectItem {
  _id: string;
  slug: string;
  title: { en: string; ar: string; fr: string };
  subtitle: { en: string; ar: string; fr: string };
  summary: { en: string; ar: string; fr: string };
  category: string;
  flagship: boolean;
  image: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  order: number;
}

export const AdminProjects: React.FC = () => {
  const { language } = useLanguage();
  const tAdmin = adminTranslations[language] || adminTranslations.fr;

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form State
  const initialForm = {
    titleEn: '',
    titleAr: '',
    titleFr: '',
    subtitleEn: '',
    subtitleAr: '',
    summaryEn: '',
    summaryAr: '',
    category: 'Full-Stack',
    flagship: false,
    image: '',
    techStackInput: '',
    liveUrl: '',
    githubUrl: '',
    order: 0,
  };
  const [form, setForm] = useState(initialForm);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.getProjects();
      if (res.success && res.data) {
        setProjects(res.data);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(initialForm);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (p: ProjectItem) => {
    setEditingId(p._id);
    setForm({
      titleEn: p.title?.en || '',
      titleAr: p.title?.ar || '',
      titleFr: p.title?.fr || '',
      subtitleEn: p.subtitle?.en || '',
      subtitleAr: p.subtitle?.ar || '',
      summaryEn: p.summary?.en || '',
      summaryAr: p.summary?.ar || '',
      category: p.category || 'Full-Stack',
      flagship: !!p.flagship,
      image: p.image || '',
      techStackInput: p.techStack ? p.techStack.join(', ') : '',
      liveUrl: p.liveUrl || (p as any).caseStudy?.liveUrl || '',
      githubUrl: p.githubUrl || (p as any).caseStudy?.githubUrl || '',
      order: p.order || 0,
    });
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const res = await api.uploadFile(file);
      if (res.success && res.url) {
        setForm((prev) => ({ ...prev, image: res.url }));
        setSuccessMsg(tAdmin.projects.uploadSuccess);
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setErrorMsg(res.message || 'Upload failed');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error during file upload');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const techArray = form.techStackInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: {
        en: form.titleEn,
        ar: form.titleAr || form.titleEn,
        fr: form.titleFr || form.titleEn,
      },
      subtitle: {
        en: form.subtitleEn,
        ar: form.subtitleAr || form.subtitleEn,
        fr: form.subtitleEn,
      },
      summary: {
        en: form.summaryEn,
        ar: form.summaryAr || form.summaryEn,
        fr: form.summaryEn,
      },
      category: form.category,
      flagship: form.flagship,
      image: form.image,
      techStack: techArray,
      liveUrl: form.liveUrl,
      githubUrl: form.githubUrl,
      caseStudy: {
        liveUrl: form.liveUrl,
        githubUrl: form.githubUrl,
      },
      order: Number(form.order) || 0,
    };

    try {
      let res;
      if (editingId) {
        res = await api.updateProject(editingId, payload);
      } else {
        res = await api.createProject(payload);
      }

      if (res.success) {
        setIsModalOpen(false);
        fetchProjects();
        setSuccessMsg(editingId ? tAdmin.projects.successUpdate : tAdmin.projects.successAdd);
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(res.message || 'Operation failed');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Server error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`${tAdmin.projects.confirmDelete} "${title}" ?`)) {
      return;
    }

    try {
      const res = await api.deleteProject(id);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
        setSuccessMsg(tAdmin.projects.successDelete);
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        alert(res.message || 'Failed to delete');
      }
    } catch (err: any) {
      alert(err.message || 'Error deleting project');
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      (p.title?.ar && p.title.ar.toLowerCase().includes(search.toLowerCase())) ||
      (p.title?.en && p.title.en.toLowerCase().includes(search.toLowerCase())) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      categoryFilter === 'All' || p.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-pink-950/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {tAdmin.projects.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {tAdmin.projects.subtitle}
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-lg shadow-pink-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{tAdmin.projects.addBtn}</span>
        </button>
      </div>

      {/* Success Alert */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-emerald-200 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={tAdmin.projects.searchPlaceholder}
            className="w-full bg-[#120620] border border-pink-950 focus:border-pink-500 rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {['All', 'Full-Stack', 'Frontend', 'Backend', 'Mobile'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                categoryFilter === cat
                  ? 'bg-pink-500 text-white font-bold shadow-sm'
                  : 'bg-pink-950/30 text-slate-400 hover:text-white hover:bg-pink-900/40 border border-pink-900/30'
              }`}
            >
              {cat === 'All' ? tAdmin.projects.all : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table / Cards */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-sm">...</div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-12 text-center bg-[#120620]/60 border border-pink-950 rounded-2xl text-slate-400 text-xs">
          {tAdmin.projects.noProjectsFound}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((p) => (
            <div
              key={p._id}
              className="bg-[#120620]/90 border border-pink-950/80 hover:border-pink-800/60 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Project Card Image & Badges */}
              <div className="relative h-44 bg-slate-900 overflow-hidden">
                {p.image ? (
                  <img
                    src={p.image.startsWith('/uploads') ? `http://localhost:5000${p.image}` : p.image}
                    alt={p.title?.ar || p.title?.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-pink-950/60 to-purple-950/60 text-pink-300">
                    <ImageIcon className="w-10 h-10 opacity-50" />
                  </div>
                )}

                {/* Badges on image */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-pink-300 border border-pink-800/40">
                    {p.category}
                  </span>
                  {p.flagship && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/80 text-white flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Flagship</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-sm text-white line-clamp-1 mb-1">
                    {language === 'ar' ? (p.title?.ar || p.title?.en) : (p.title?.en || p.title?.ar)}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {language === 'ar'
                      ? (p.subtitle?.ar || p.subtitle?.en || p.summary?.ar || p.summary?.en)
                      : (p.subtitle?.en || p.subtitle?.ar || p.summary?.en || p.summary?.ar)}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                {p.techStack && p.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {p.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-pink-950/40 border border-pink-900/40 text-pink-200 px-2 py-0.5 rounded font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {p.techStack.length > 4 && (
                      <span className="text-[10px] text-slate-400">+{p.techStack.length - 4}</span>
                    )}
                  </div>
                )}

                {/* Actions Footer */}
                <div className="pt-3 border-t border-pink-950/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-pink-300"
                        title="Live Preview"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-pink-300"
                        title="GitHub Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(p)}
                      className="p-1.5 rounded-lg bg-pink-950/40 hover:bg-pink-900/60 text-pink-300 border border-pink-800/40 transition-colors"
                      title={tAdmin.projects.edit}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id, p.title?.ar || p.title?.en)}
                      className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 transition-colors"
                      title={tAdmin.projects.delete}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#12071d] border border-pink-900/50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-pink-950/80 mb-5">
              <h2 className="text-lg font-bold text-white">
                {editingId ? tAdmin.projects.modalEditTitle : tAdmin.projects.modalAddTitle}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-pink-950/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-800/60 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Multilingual Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    {tAdmin.projects.titleAr}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.titleAr}
                    onChange={(e) => setForm({ ...form, titleAr: e.target.value })}
                    placeholder="مثال: منصة تسلا للتجارة الإلكترونية"
                    className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    {tAdmin.projects.titleEn}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.titleEn}
                    onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                    placeholder="e.g. TSLA Ecom"
                    className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Category & Flagship */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">{tAdmin.projects.category}</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">{tAdmin.projects.order}</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                    className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div className="sm:pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.flagship}
                      onChange={(e) => setForm({ ...form, flagship: e.target.checked })}
                      className="w-4 h-4 rounded text-pink-500 focus:ring-pink-500 bg-[#0a0312] border-pink-950"
                    />
                    <span className="font-semibold text-pink-300">{tAdmin.projects.flagship}</span>
                  </label>
                </div>
              </div>

              {/* Subtitles / Summaries */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  {tAdmin.projects.subtitleAr}
                </label>
                <textarea
                  rows={2}
                  value={form.subtitleAr}
                  onChange={(e) => setForm({ ...form, subtitleAr: e.target.value })}
                  placeholder="وصف مختصر يظهر في بطاقة المشروع..."
                  className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  {tAdmin.projects.subtitleEn}
                </label>
                <textarea
                  rows={2}
                  value={form.subtitleEn}
                  onChange={(e) => setForm({ ...form, subtitleEn: e.target.value })}
                  placeholder="Brief description for the card..."
                  className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  {tAdmin.projects.techStack}
                </label>
                <input
                  type="text"
                  value={form.techStackInput}
                  onChange={(e) => setForm({ ...form, techStackInput: e.target.value })}
                  placeholder="React, Node.js, Express, MongoDB, Tailwind CSS"
                  className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
                />
              </div>

              {/* Project Image Upload & URL */}
              <div className="p-3.5 rounded-xl bg-[#0a0312] border border-pink-950/80 space-y-2">
                <label className="block font-semibold text-slate-300">{tAdmin.projects.imageLabel}</label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="/projects/example.jpg"
                    className="w-full bg-[#120620] border border-pink-900/50 rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
                  />
                  <label className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pink-950/60 hover:bg-pink-900/80 border border-pink-800/60 text-pink-300 cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? tAdmin.projects.uploading : tAdmin.projects.uploadFromDevice}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                </div>
                {form.image && (
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-[10px] text-slate-400">{tAdmin.projects.preview}</span>
                    <img
                      src={form.image.startsWith('/uploads') ? `http://localhost:5000${form.image}` : form.image}
                      alt="Preview"
                      className="w-16 h-10 object-cover rounded-lg border border-pink-900"
                    />
                  </div>
                )}
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    {tAdmin.projects.liveUrl}
                  </label>
                  <input
                    type="url"
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    placeholder="https://my-app.vercel.app"
                    className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    {tAdmin.projects.githubUrl}
                  </label>
                  <input
                    type="url"
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    placeholder="https://github.com/soumiatighilt/my-app"
                    className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 border-t border-pink-950/80 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white bg-pink-950/30 hover:bg-pink-900/40"
                >
                  {tAdmin.projects.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="px-6 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-md shadow-pink-500/20 disabled:opacity-50"
                >
                  {isSubmitting ? tAdmin.projects.saving : tAdmin.projects.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
