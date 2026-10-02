import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import { adminTranslations } from '../../data/adminTranslations';
import {
  FolderGit2,
  Cpu,
  Mail,
  PlusCircle,
  ExternalLink,
  MessageSquare,
  Clock,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminOverview: React.FC = () => {
  const { language } = useLanguage();
  const tAdmin = adminTranslations[language] || adminTranslations.fr;

  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.getStats();
      if (res.success && res.data) {
        setStats(res.data);
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: tAdmin.overview.totalProjects,
      value: stats?.totalProjects ?? 0,
      sub: `${stats?.flagshipProjects ?? 0} ${tAdmin.overview.flagshipProjects}`,
      icon: FolderGit2,
      color: 'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-400',
      link: '/admin/projects',
    },
    {
      title: tAdmin.overview.totalSkills,
      value: stats?.totalSkills ?? 0,
      sub: 'Frontend, Backend, DB & Tools',
      icon: Cpu,
      color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-400',
      link: '/admin/skills',
    },
    {
      title: tAdmin.overview.visitorMessages,
      value: stats?.totalMessages ?? 0,
      sub: `${stats?.unreadMessages ?? 0} ${tAdmin.overview.unreadMessages}`,
      icon: Mail,
      color: 'from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/30 text-fuchsia-400',
      link: '/admin/messages',
    },
    {
      title: tAdmin.overview.serverStatus,
      value: tAdmin.overview.serverOnline,
      sub: tAdmin.overview.serverDesc,
      icon: Sparkles,
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
      link: '/admin/profile',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-pink-950/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <span>{tAdmin.overview.title}</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-normal">
              CMS Live
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {tAdmin.overview.subtitle}
          </p>
        </div>

        {/* Quick Action Shortcuts */}
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            to="/admin/projects"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-md shadow-pink-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{tAdmin.overview.newProject}</span>
          </Link>
          <Link
            to="/admin/skills"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-pink-300 bg-pink-950/40 hover:bg-pink-900/50 border border-pink-800/50 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{tAdmin.overview.newSkill}</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className={`p-5 rounded-2xl bg-[#120620]/80 border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-950/40 relative overflow-hidden group ${
                card.color
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-400">{card.title}</span>
                <div className="p-2 rounded-xl bg-pink-950/40 border border-pink-800/30 text-pink-300 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">
                {card.value}
              </div>
              <p className="text-[11px] text-slate-400 font-normal">{card.sub}</p>
            </Link>
          );
        })}
      </div>

      {/* Two columns: Recent Messages & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Messages (7 cols) */}
        <div className="lg:col-span-7 bg-[#120620]/90 border border-pink-950/80 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-pink-950/60 mb-4">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-pink-400" />
              <h2 className="text-sm font-bold text-white">{tAdmin.overview.recentMessages}</h2>
            </div>
            <Link
              to="/admin/messages"
              className="text-xs text-pink-400 hover:text-pink-300 flex items-center gap-1"
            >
              <span>{tAdmin.overview.viewAll}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {stats?.recentMessages && stats.recentMessages.length > 0 ? (
            <div className="space-y-3">
              {stats.recentMessages.map((msg: any) => (
                <div
                  key={msg._id}
                  className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                    !msg.isRead
                      ? 'bg-pink-950/30 border-pink-800/50'
                      : 'bg-[#0e0419] border-pink-950/40 opacity-80'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{msg.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({msg.email})</span>
                      {!msg.isRead && (
                        <span className="text-[9px] bg-pink-500 text-white px-1.5 py-0.5 rounded font-bold">
                          {tAdmin.overview.newBadge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-1">{msg.message}</p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(msg.createdAt).toLocaleDateString(language === 'ar' ? 'ar-EG' : language === 'fr' ? 'fr-FR' : 'en-US')}</span>
                    </div>
                  </div>
                  <Link
                    to="/admin/messages"
                    className="shrink-0 text-xs px-2.5 py-1 rounded-lg bg-pink-950/50 hover:bg-pink-900/60 border border-pink-800/40 text-pink-300"
                  >
                    {tAdmin.overview.readBtn}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-500 text-xs flex flex-col items-center gap-2">
              <MessageSquare className="w-8 h-8 text-slate-600" />
              <span>{tAdmin.overview.noMessages}</span>
            </div>
          )}
        </div>

        {/* Right Column: Recent Projects (5 cols) */}
        <div className="lg:col-span-5 bg-[#120620]/90 border border-pink-950/80 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-pink-950/60 mb-4">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-bold text-white">{tAdmin.overview.recentProjects}</h2>
            </div>
            <Link
              to="/admin/projects"
              className="text-xs text-pink-400 hover:text-pink-300 flex items-center gap-1"
            >
              <span>{tAdmin.overview.viewAll}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {stats?.recentProjects && stats.recentProjects.length > 0 ? (
            <div className="space-y-3">
              {stats.recentProjects.map((p: any) => (
                <div
                  key={p._id}
                  className="p-3 rounded-xl bg-[#0e0419] border border-pink-950/40 flex items-center justify-between gap-3 hover:border-pink-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {p.image ? (
                      <img
                        src={p.image.startsWith('/uploads') ? `http://localhost:5000${p.image}` : p.image}
                        alt="Project"
                        className="w-10 h-10 rounded-lg object-cover bg-slate-900 shrink-0 border border-pink-900/30"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-pink-950/40 border border-pink-900/40 flex items-center justify-center text-pink-400 shrink-0 text-xs font-bold">
                        P
                      </div>
                    )}
                    <div className="truncate">
                      <p className="text-xs font-bold text-white truncate">
                        {p.title?.[language] || p.title?.fr || p.title?.en || p.title?.ar || 'Projet'}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-pink-400 font-mono">{p.category}</span>
                        {p.flagship && (
                          <span className="text-[9px] bg-rose-950/60 text-rose-300 border border-rose-800/50 px-1.5 rounded">
                            Flagship
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/admin/projects"
                    className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-pink-300 hover:bg-pink-950/40"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-500 text-xs">{tAdmin.overview.noProjects}</div>
          )}
        </div>
      </div>
    </div>
  );
};
