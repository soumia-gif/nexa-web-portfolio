import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import { adminTranslations } from '../../data/adminTranslations';
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Star,
} from 'lucide-react';

interface SkillItem {
  _id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
  level: string;
  highlight: boolean;
  icon: string;
  context: { en: string; ar: string; fr: string };
  order: number;
}

export const AdminSkills: React.FC = () => {
  const { language } = useLanguage();
  const tAdmin = adminTranslations[language] || adminTranslations.fr;

  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const initialForm = {
    name: '',
    category: 'frontend' as 'frontend' | 'backend' | 'database' | 'tools',
    level: 'Core',
    highlight: true,
    icon: 'Code',
    contextAr: '',
    contextEn: '',
    order: 0,
  };
  const [form, setForm] = useState(initialForm);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await api.getSkills();
      if (res.success && res.data) {
        setSkills(res.data);
      }
    } catch (err) {
      console.error('Failed to load skills:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(initialForm);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (s: SkillItem) => {
    setEditingId(s._id);
    setForm({
      name: s.name,
      category: s.category,
      level: s.level || 'Core',
      highlight: s.highlight ?? true,
      icon: s.icon || 'Code',
      contextAr: s.context?.ar || '',
      contextEn: s.context?.en || '',
      order: s.order || 0,
    });
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const payload = {
      name: form.name,
      category: form.category,
      level: form.level,
      highlight: form.highlight,
      icon: form.icon,
      order: Number(form.order) || 0,
      context: {
        en: form.contextEn,
        ar: form.contextAr || form.contextEn,
        fr: form.contextEn,
      },
    };

    try {
      let res;
      if (editingId) {
        res = await api.updateSkill(editingId, payload);
      } else {
        res = await api.createSkill(payload);
      }

      if (res.success) {
        setIsModalOpen(false);
        fetchSkills();
        setSuccessMsg(editingId ? tAdmin.skills.successUpdate : tAdmin.skills.successAdd);
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setErrorMsg(res.message || 'Operation failed');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Server error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`${tAdmin.skills.confirmDelete} "${name}" ?`)) return;

    try {
      const res = await api.deleteSkill(id);
      if (res.success) {
        setSkills((prev) => prev.filter((s) => s._id !== id));
        setSuccessMsg(tAdmin.skills.successDelete);
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        alert(res.message || 'Failed to delete');
      }
    } catch (err: any) {
      alert(err.message || 'Error deleting skill');
    }
  };

  const filteredSkills = skills.filter((s) => {
    if (categoryFilter === 'All') return true;
    return s.category === categoryFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-pink-950/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {tAdmin.skills.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {tAdmin.skills.subtitle}
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-lg shadow-pink-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{tAdmin.skills.addBtn}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-emerald-200 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'All', label: tAdmin.skills.all },
          { id: 'frontend', label: 'Frontend' },
          { id: 'backend', label: 'Backend' },
          { id: 'database', label: 'Database' },
          { id: 'tools', label: 'Tools & Outils' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCategoryFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              categoryFilter === tab.id
                ? 'bg-pink-500 text-white shadow-md shadow-pink-500/30'
                : 'bg-pink-950/30 text-slate-400 hover:text-white hover:bg-pink-900/40 border border-pink-900/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-sm">...</div>
      ) : filteredSkills.length === 0 ? (
        <div className="p-12 text-center bg-[#120620]/60 border border-pink-950 rounded-2xl text-slate-400 text-xs">
          {tAdmin.skills.noSkillsFound}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((s) => (
            <div
              key={s._id}
              className="bg-[#120620]/90 border border-pink-950/80 hover:border-pink-800/60 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-950/50 border border-pink-800/40 flex items-center justify-center text-pink-300 font-mono font-bold text-xs">
                    {s.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                      <span>{s.name}</span>
                      {s.highlight && (
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      )}
                    </h3>
                    <span className="text-[10px] text-pink-400 font-mono capitalize">
                      {s.category} • {s.level}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(s)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-pink-300 hover:bg-pink-950/40"
                    title={tAdmin.skills.edit}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(s._id, s.name)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/40"
                    title={tAdmin.skills.delete}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {s.context && (s.context.ar || s.context.en) && (
                <p className="text-xs text-slate-300 line-clamp-2 bg-[#090310] p-2.5 rounded-xl border border-pink-950/50 font-normal">
                  {language === 'ar' ? (s.context.ar || s.context.en) : (s.context.en || s.context.ar)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#12071d] border border-pink-900/50 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-pink-950/80 mb-4">
              <h2 className="text-lg font-bold text-white">
                {editingId ? tAdmin.skills.modalEditTitle : tAdmin.skills.modalAddTitle}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-800 text-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">{tAdmin.skills.skillName}</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="React.js, Node.js..."
                  className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">{tAdmin.skills.category}</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="database">Database</option>
                    <option value="tools">Tools</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">{tAdmin.skills.level}</label>
                  <input
                    type="text"
                    value={form.level}
                    onChange={(e) => setForm({ ...form, level: e.target.value })}
                    placeholder="Core / Tooling / Advanced"
                    className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="highlight"
                  checked={form.highlight}
                  onChange={(e) => setForm({ ...form, highlight: e.target.checked })}
                  className="w-4 h-4 rounded text-pink-500 focus:ring-pink-500 bg-[#0a0312] border-pink-950"
                />
                <label htmlFor="highlight" className="font-semibold text-pink-300 cursor-pointer">
                  {tAdmin.skills.highlight}
                </label>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  {tAdmin.skills.contextAr}
                </label>
                <textarea
                  rows={2}
                  value={form.contextAr}
                  onChange={(e) => setForm({ ...form, contextAr: e.target.value })}
                  placeholder="..."
                  className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  {tAdmin.skills.contextEn}
                </label>
                <textarea
                  rows={2}
                  value={form.contextEn}
                  onChange={(e) => setForm({ ...form, contextEn: e.target.value })}
                  placeholder="..."
                  className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-pink-950 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 bg-pink-950/30"
                >
                  {tAdmin.skills.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-md shadow-pink-500/20"
                >
                  {isSubmitting ? tAdmin.skills.saving : editingId ? tAdmin.skills.save : tAdmin.skills.addBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
