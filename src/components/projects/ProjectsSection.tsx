import React, { useState, useEffect } from 'react';
import { Project } from '../../types';
import { projectsData } from '../../data/projectsData';
import { ProjectCard } from './ProjectCard';
import { ProjectCaseStudyModal } from './ProjectCaseStudyModal';
import { useLanguage } from '../../context/LanguageContext';
import { api } from '../../services/api';

export const ProjectsSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [projectsList, setProjectsList] = useState<Project[]>(projectsData);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'fullstack' | 'web'>('all');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await api.getProjects();
        if (res.success && Array.isArray(res.data)) {
          const mapped: Project[] = res.data.map((p: any) => ({
            id: p.slug || p._id,
            title: p.title || { en: '', ar: '', fr: '' },
            subtitle: p.subtitle || { en: '', ar: '', fr: '' },
            category: p.category || 'Full-Stack',
            badge: p.badge || '',
            flagship: !!p.flagship,
            coverGradient: p.coverGradient || 'from-pink-900/50 via-purple-950/40 to-rose-950/40',
            image: p.image?.startsWith('/uploads') ? `http://localhost:5000${p.image}` : p.image,
            metrics: p.metrics || [],
            techStack: p.techStack || [],
            summary: p.summary || { en: '', ar: '', fr: '' },
            caseStudy: {
              overview: p.caseStudy?.overview || p.summary?.[language] || '',
              theProblem: p.caseStudy?.theProblem || '',
              architecturalSolution: p.caseStudy?.architecturalSolution || '',
              architectureHighlights: p.caseStudy?.architectureHighlights || [],
              stackBreakdown: p.caseStudy?.stackBreakdown || [],
              schemaAndSecurity: p.caseStudy?.schemaAndSecurity || '',
              keyChallenges: p.caseStudy?.keyChallenges || [],
              measurableImpact: p.caseStudy?.measurableImpact || p.metrics || [],
              githubUrl: p.githubUrl || p.caseStudy?.githubUrl || '',
              liveUrl: p.liveUrl || p.caseStudy?.liveUrl || '',
            },
          }));
          setProjectsList(mapped);
        }
      } catch (err) {
        // Fallback to static projectsData
      }
    };

    loadProjects();
  }, [language]);

  const filterOptions = [
    {
      id: 'all',
      count: projectsList.length,
      label: { en: 'All Projects', fr: 'Tous les projets', ar: 'جميع المشاريع' },
    },
    {
      id: 'fullstack',
      count: projectsList.filter((p) => p.category.toLowerCase().includes('full-stack')).length,
      label: { en: 'Full-Stack', fr: 'Full-Stack', ar: 'تطبيقات Full-Stack' },
    },
    {
      id: 'web',
      count: projectsList.filter((p) => !p.category.toLowerCase().includes('full-stack')).length,
      label: { en: 'Web Development', fr: 'Développement Web', ar: 'تطوير الويب' },
    },
  ] as const;

  const filteredProjects = projectsList.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'fullstack') return project.category.toLowerCase().includes('full-stack');
    if (activeFilter === 'web') return !project.category.toLowerCase().includes('full-stack');
    return true;
  });

  return (
    <section id="projects" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching design system */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-pink-300 bg-pink-950/50 border border-pink-800/40 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            <span>{projectsData.length} Featured Works</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">
            {t.projects.title}
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold font-mono transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25 border border-pink-400/50 scale-105'
                    : 'bg-[#130a1e]/80 text-pink-200/70 border border-pink-900/40 hover:text-white hover:border-pink-700/60'
                }`}
              >
                <span>{filter.label[language] || filter.label.en}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-pink-950/70 text-pink-300/80 border border-pink-800/40'
                }`}>
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Responsive Projects Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenCaseStudy={(p) => setSelectedProject(p)}
            />
          ))}
        </div>

      </div>

      {/* Deep-Dive Case Study Modal */}
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
