import React, { useState, useEffect } from 'react';
import { Skill } from '../../types';
import { skillsData } from '../../data/skillsData';
import { useLanguage } from '../../context/LanguageContext';
import { Code2, Server, Database, Wrench } from 'lucide-react';
import { api } from '../../services/api';

export const SkillsSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [skillsList, setSkillsList] = useState<Skill[]>(skillsData);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const res = await api.getSkills();
        if (res.success && Array.isArray(res.data)) {
          const mapped: Skill[] = res.data.map((s: any) => ({
            name: s.name,
            category: s.category,
            level: s.level,
            highlight: !!s.highlight,
            context: s.context || { en: '', ar: '', fr: '' },
          }));
          setSkillsList(mapped);
        }
      } catch (err) {
        // Fallback
      }
    };

    loadSkills();
  }, []);

  const categories = [
    {
      id: 'frontend',
      title: t.skills.frontend,
      icon: <Code2 className="w-5 h-5 text-pink-400" />,
      skills: skillsList.filter((s) => s.category === 'frontend'),
      gradient: 'from-pink-500/20 via-rose-500/10 to-transparent'
    },
    {
      id: 'backend',
      title: t.skills.backend,
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      skills: skillsList.filter((s) => s.category === 'backend'),
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent'
    },
    {
      id: 'database',
      title: t.skills.database,
      icon: <Database className="w-5 h-5 text-amber-400" />,
      skills: skillsList.filter((s) => s.category === 'database'),
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent'
    },
    {
      id: 'tools',
      title: t.skills.tools,
      icon: <Wrench className="w-5 h-5 text-purple-400" />,
      skills: skillsList.filter((s) => s.category === 'tools'),
      gradient: 'from-purple-500/20 via-fuchsia-500/10 to-transparent'
    }
  ];

  return (
    <section id="skills" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-sm mb-3">
            {t.skills.title}
          </h2>
          <p className="text-sm sm:text-base text-pink-200/70">
            {t.skills.subtitle}
          </p>
        </div>

        {/* 4 Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="rounded-2xl p-5 sm:p-6 bg-[#130a1e]/85 border border-pink-900/40 shadow-xl shadow-black/40 hover:border-pink-500/60 hover:shadow-pink-500/15 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-pink-950/80">
                  <div className="p-2.5 rounded-xl bg-pink-950/40 border border-pink-800/40 shadow-sm">
                    {cat.icon}
                  </div>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    {cat.title}
                  </h3>
                </div>

                {/* Skills List in this Category */}
                <div className="space-y-3">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl bg-[#190a28]/70 border border-pink-900/30 hover:border-pink-500/40 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-pink-100">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-pink-950/60 text-pink-300 border border-pink-800/40">
                          {skill.category === 'tools' ? 'Tool' : 'MERN'}
                        </span>
                      </div>
                      {skill.context && (
                        <p className="text-xs text-pink-300/60 leading-relaxed">
                          {skill.context[language] || skill.context.en}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
