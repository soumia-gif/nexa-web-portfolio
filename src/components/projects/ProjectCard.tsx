import React from 'react';
import { Project } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { ExternalLink, Github, Dumbbell, Utensils, CloudSun, ShoppingCart, UtensilsCrossed, Image as ImageIcon, ChevronRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenCaseStudy }) => {
  const { language, t } = useLanguage();

  const getProjectIcon = () => {
    switch (project.id) {
      case 'tsla-ecom':
        return <ShoppingCart className="w-7 h-7 text-pink-400" />;
      case 'tsla-restaurant':
        return <UtensilsCrossed className="w-7 h-7 text-rose-400" />;
      case 'adrenaline-salle':
        return <Dumbbell className="w-7 h-7 text-pink-400" />;
      case 'mes-recettes':
        return <Utensils className="w-7 h-7 text-rose-400" />;
      case 'meteo-app':
        return <CloudSun className="w-7 h-7 text-fuchsia-400" />;
      default:
        return <ImageIcon className="w-7 h-7 text-pink-400" />;
    }
  };

  const getTagStyle = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'react':
        return 'bg-pink-950/40 text-pink-300 border-pink-700/40';
      case 'node.js':
        return 'bg-emerald-950/40 text-emerald-300 border-emerald-700/40';
      case 'express':
        return 'bg-purple-950/40 text-purple-300 border-purple-700/40';
      case 'mongodb':
        return 'bg-rose-950/40 text-rose-300 border-rose-700/40';
      case 'mongoose':
        return 'bg-amber-950/40 text-amber-300 border-amber-700/40';
      case 'tailwind css':
      case 'tailwind':
        return 'bg-sky-950/40 text-sky-300 border-sky-700/40';
      case 'javascript':
        return 'bg-yellow-950/40 text-yellow-300 border-yellow-700/40';
      case 'api':
        return 'bg-cyan-950/40 text-cyan-300 border-cyan-700/40';
      default:
        return 'bg-pink-950/40 text-pink-300 border-pink-700/40';
    }
  };

  return (
    <div className="group h-full rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl bg-[#130a1e]/85 border border-pink-900/40 shadow-xl shadow-black/40 hover:border-pink-500/60 hover:shadow-pink-500/15 backdrop-blur-xl">
      <div className="flex-1 flex flex-col">
        {/* 
          =======================================================================
          ZONE CAPTURE D'ÉCRAN / SCREENSHOT PREVIEW
          =======================================================================
        */}
        <div 
          className="mb-4 cursor-pointer overflow-hidden rounded-t-xl relative" 
          onClick={() => onOpenCaseStudy(project)}
          title={t.projects.caseStudyBtn}
        >
          {project.image ? (
            <div className="overflow-hidden rounded-t-xl border border-pink-900/40 shadow-inner group-hover:border-pink-500/50 transition-colors relative">
              <img
                src={project.image}
                alt={project.title[language] || project.title.en}
                loading="lazy"
                className="w-full h-48 object-cover object-top rounded-t-xl transition-transform duration-300 hover:scale-105"
              />
              {/* Type / Badge overlay on top corner */}
              <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-semibold bg-[#0c0514]/85 text-pink-300 border border-pink-700/50 backdrop-blur-md shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                  {project.badge || project.category}
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full h-48 rounded-xl bg-gradient-to-br from-[#1b0c2a] via-[#140822] to-[#0c0314] border border-pink-900/40 p-3.5 flex flex-col justify-between shadow-inner relative group-hover:border-pink-500/50 transition-all overflow-hidden">
              {/* Mock Browser Header with rose dots */}
              <div className="flex items-center justify-between pb-2 border-b border-pink-950/60">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400/80" />
                  <span className="w-2 h-2 rounded-full bg-pink-400/80" />
                  <span className="w-2 h-2 rounded-full bg-fuchsia-400/80" />
                </div>
                <span className="text-[10px] font-mono text-pink-300/60">
                  {project.id}
                </span>
                <span className="text-[10px] text-pink-400/80 font-mono">
                  {project.badge || project.category}
                </span>
              </div>

              {/* Aesthetic project preview center */}
              <div className="flex flex-col items-center justify-center my-auto py-2">
                <div className="p-3 rounded-2xl bg-pink-950/40 border border-pink-800/40 shadow-lg mb-2 group-hover:scale-110 transition-transform">
                  {getProjectIcon()}
                </div>
                <span className="text-xs font-semibold text-pink-200/90 tracking-wide text-center">
                  {project.title[language] || project.title.en}
                </span>
                <span className="text-[10px] text-pink-400/60 mt-0.5">
                  {language === 'fr' ? "Capture d'écran bientôt disponible" : language === 'ar' ? 'لقطة الشاشة ستتوفر قريباً' : 'Screenshot coming soon'}
                </span>
              </div>

              {/* Bottom mini indicator */}
              <div className="flex items-center justify-between text-[10px] font-mono text-pink-300/70 pt-1.5 border-t border-pink-950/60">
                <span className="text-pink-400 flex items-center gap-1">● React App</span>
                <span className="flex items-center gap-1 text-pink-300 hover:text-white transition-colors">
                  {t.projects.caseStudyBtn.split(' ')[0]} <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Project Title, Badge & Subtitle */}
        <div className="mb-3">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-pink-300 px-2.5 py-0.5 rounded-full bg-pink-950/60 border border-pink-800/40">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
              {project.badge || project.category}
            </span>
            {project.flagship && (
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300/90 px-2 py-0.5 rounded bg-amber-950/40 border border-amber-800/40">
                Featured
              </span>
            )}
          </div>
          <h3
            onClick={() => onOpenCaseStudy(project)}
            className="text-base sm:text-lg font-bold text-white tracking-tight cursor-pointer hover:text-pink-400 transition-colors"
          >
            {project.title[language] || project.title.en}
          </h3>
          <p className="mt-1.5 text-xs sm:text-[13px] text-pink-200/80 leading-relaxed min-h-[3.2rem]">
            {project.subtitle[language] || project.subtitle.en}
          </p>
        </div>

        {/* Real Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className={`text-[11px] font-medium font-sans px-2.5 py-0.5 rounded-md border ${getTagStyle(tech)}`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 
        =======================================================================
        LIENS DU PROJET : LIVE DEMO & GITHUB
        Si les liens ne sont pas encore définis, les boutons restent clairs 
        et indiquent qu'ils seront ajoutés prochainement.
        =======================================================================
      */}
      <div className="pt-3.5 border-t border-pink-950/80 flex items-center justify-between gap-2.5 text-xs">
        {/* Bouton 1: Live Demo */}
        {project.caseStudy.liveUrl ? (
          <a
            href={project.caseStudy.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-400 hover:to-rose-400 shadow-sm transition-all active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{t.projects.liveDemo}</span>
          </a>
        ) : (
          <button
            type="button"
            onClick={() => onOpenCaseStudy(project)}
            title={t.projects.linkPending}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#1a0c28] border border-pink-900/50 text-pink-300/70 hover:text-pink-200 hover:border-pink-600/50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            <span>{t.projects.liveDemo}</span>
          </button>
        )}

        {/* Bouton 2: GitHub */}
        {project.caseStudy.githubUrl ? (
          <a
            href={project.caseStudy.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-pink-950/60 hover:bg-pink-900/60 text-pink-200 border border-pink-800/40 transition-all active:scale-95"
          >
            <Github className="w-3.5 h-3.5" />
            <span>{t.projects.githubCode}</span>
          </a>
        ) : (
          <button
            type="button"
            onClick={() => onOpenCaseStudy(project)}
            title={t.projects.linkPending}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#1a0c28] border border-pink-900/50 text-pink-300/70 hover:text-pink-200 hover:border-pink-600/50 transition-colors"
          >
            <Github className="w-3.5 h-3.5 opacity-60" />
            <span>{t.projects.githubCode}</span>
          </button>
        )}
      </div>

    </div>
  );
};
