import React, { useEffect } from 'react';
import { Project } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { X, ExternalLink, Github, CheckCircle2, Shield, Layers, Activity } from 'lucide-react';

interface ProjectCaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({ project, onClose }) => {
  const { language, t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0514] text-[#fdf4f8] rounded-3xl shadow-2xl border border-pink-900/50 shadow-black/90 overflow-y-auto z-10 flex flex-col scrollbar-thin">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0c0514]/95 backdrop-blur-md border-b border-pink-900/50">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-pink-950/60 text-pink-300 border border-pink-700/40">
              {project.badge || project.category}
            </span>
            <span className="text-xs text-pink-400/80 font-mono">
              // ARCHITECTURAL CASE STUDY
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-pink-300 hover:bg-pink-950/50 transition-colors"
            aria-label={t.projects.modalClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Preview Image if present */}
          {project.image && (
            <div className="overflow-hidden rounded-2xl border border-pink-900/50 shadow-2xl max-h-72 sm:max-h-96">
              <img
                src={project.image}
                alt={project.title[language] || project.title.en}
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}

          {/* Title & Headline */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 text-white">
              {project.title[language] || project.title.en}
            </h2>
            <p className="text-base sm:text-lg text-pink-300 font-medium">
              {project.subtitle[language] || project.subtitle.en}
            </p>
          </div>

          {/* Quick Action Links & Impact Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#140822] border border-pink-900/40">
            <div className="flex flex-wrap items-center gap-3">
              {caseStudy.measurableImpact.map((metric, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a0c2c] border border-pink-800/40 text-xs font-mono">
                  <Activity className="w-3.5 h-3.5 text-pink-400" />
                  <span className="text-pink-200/70">{metric.label}:</span>
                  <span className="font-bold text-white">{metric.value}</span>
                  {metric.change && (
                    <span className="text-pink-400 text-[10px] font-semibold">({metric.change})</span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {caseStudy.githubUrl ? (
                <a
                  href={caseStudy.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-pink-950/60 hover:bg-pink-900/60 text-pink-200 transition-colors border border-pink-800/40"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>{t.projects.githubCode}</span>
                </a>
              ) : (
                <span
                  title={t.projects.linkPending}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1a0c2c] text-pink-300/60 border border-pink-900/40 cursor-default"
                >
                  <Github className="w-3.5 h-3.5 opacity-50" />
                  <span>{t.projects.githubCode} ({t.projects.linkPending})</span>
                </span>
              )}

              {caseStudy.liveUrl ? (
                <a
                  href={caseStudy.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-400 hover:to-rose-400 transition-colors shadow-sm"
                >
                  <span>{t.projects.liveDemo}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span
                  title={t.projects.linkPending}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1a0c2c] text-pink-300/60 border border-pink-900/40 cursor-default"
                >
                  <span>{t.projects.liveDemo} ({t.projects.linkPending})</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                </span>
              )}
            </div>
          </div>

          {/* 1. Problem Statement */}
          <div className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              {t.projects.modalProblem}
            </h3>
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 text-sm sm:text-base text-slate-200 leading-relaxed">
              {caseStudy.theProblem}
            </div>
          </div>

          {/* 2. Architectural Solution */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-pink-400 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
              {t.projects.modalArchitecture}
            </h3>
            <p className="text-sm sm:text-base text-pink-100/90 leading-relaxed">
              {caseStudy.architecturalSolution}
            </p>

            {/* Architectural Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {caseStudy.architectureHighlights.map((hl, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#140822] border border-pink-900/40 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">
                      {hl.title}
                    </span>
                    {hl.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-950/60 text-pink-300 border border-pink-700/40">
                        {hl.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-pink-200/70 leading-relaxed">
                    {hl.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Database Schema & Security Strategy */}
          <div className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-2">
              <Shield className="w-4 h-4" />
              {t.projects.modalSchema}
            </h3>
            <div className="p-4 sm:p-5 rounded-2xl bg-purple-950/20 border border-purple-900/30 text-sm text-pink-100/90 leading-relaxed">
              {caseStudy.schemaAndSecurity}
            </div>
          </div>

          {/* 4. Key Engineering Hurdles Solved */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              {t.projects.modalChallenges}
            </h3>
            <div className="space-y-3">
              {caseStudy.keyChallenges.map((kc, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#140822] border border-pink-900/40 space-y-2"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400 mt-0.5">CHALLENGE:</span>
                    <p className="text-xs sm:text-sm font-medium text-pink-100">
                      {kc.challenge}
                    </p>
                  </div>
                  <div className="flex items-start gap-2 pt-1 border-t border-pink-950/80">
                    <span className="text-xs font-mono font-bold text-rose-400 mt-0.5">RESOLUTION:</span>
                    <p className="text-xs sm:text-sm text-pink-200/75">
                      {kc.resolution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Complete Stack Breakdown */}
          <div className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
              <Layers className="w-4 h-4 text-pink-500" />
              <span>Technology Matrix</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {caseStudy.stackBreakdown.map((sb, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#140822] border border-pink-900/40">
                  <div className="text-xs font-bold text-white mb-2 pb-1 border-b border-pink-900/50">
                    {sb.category}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {sb.technologies.map((item, j) => (
                      <span
                        key={j}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1d0a2f] text-pink-200 border border-pink-800/50"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-[#09020f] border-t border-pink-900/50 flex items-center justify-between">
          <span className="text-xs font-mono text-pink-400/80">
            {project.title[language] || project.title.en} // Architecture
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-400 hover:to-rose-400 transition-colors shadow-sm"
          >
            {t.projects.modalClose}
          </button>
        </div>

      </div>
    </div>
  );
};
