export type Language = 'en' | 'fr' | 'ar';
export type Theme = 'light' | 'dark';

export interface ProjectMetric {
  label: string;
  value: string;
  change?: string;
}

export interface TechStackCategory {
  category: string;
  technologies: string[];
}

export interface ArchitectureHighlight {
  title: string;
  description: string;
  badge?: string;
}

export interface ProjectCaseStudy {
  overview: string;
  theProblem: string;
  architecturalSolution: string;
  architectureHighlights: ArchitectureHighlight[];
  stackBreakdown: TechStackCategory[];
  schemaAndSecurity: string;
  keyChallenges: {
    challenge: string;
    resolution: string;
  }[];
  measurableImpact: ProjectMetric[];
  githubUrl: string;
  liveUrl: string;
}

export interface Project {
  id: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  category: string;
  badge?: string;
  flagship: boolean;
  coverGradient: string;
  image?: string; // Emplacement pour la capture d'écran réelle (fournie ultérieurement)
  metrics: ProjectMetric[];
  techStack: string[];
  summary: Record<Language, string>;
  caseStudy: ProjectCaseStudy;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
  level?: string;
  context?: Record<Language, string>;
  highlight?: boolean;
}

export interface PhilosophyPrinciple {
  title: Record<Language, string>;
  tagline: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
}

export type BackgroundTheme =
  | 'midnight-orchid'
  | 'cyber-matrix'
  | 'deep-cosmos'
  | 'sunset-aurora'
  | 'minimal-mesh';

export interface SocialLinkItem {
  _id?: string;
  platform: string;
  title: string;
  url: string;
  icon: string;
  enabled: boolean;
  order: number;
}

export interface SectionConfig {
  id: string;
  label: Record<string, string>;
  enabled: boolean;
  order: number;
}

export interface SiteSettings {
  backgroundTheme: BackgroundTheme;
  sections: SectionConfig[];
  cvSettings: {
    enabled: boolean;
    title: Record<string, string>;
    description: Record<string, string>;
    fileName?: string;
  };
}

