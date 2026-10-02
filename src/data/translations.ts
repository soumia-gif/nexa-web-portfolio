import { Language } from '../types';

export interface TranslationDictionary {
  nav: {
    home: string;
    about: string;
    projects: string;
    skills: string;
    contact: string;
    lightMode: string;
    darkMode: string;
    language: string;
  };
  hero: {
    rolePrefix: string;
    roleHighlight: string;
    subheading: string;
    viewProjects: string;
    contactMe: string;
    downloadCv: string;
  };
  about: {
    title: string;
    subtitle: string;
    bioParagraph1: string;
    bioParagraph2: string;
    experienceTitle: string;
    educationTitle: string;
    educationDegree: string;
    educationSchool: string;
    educationDesc: string;
    statsProjects: string;
    statsProjectsSub: string;
    statsExp: string;
    statsExpSub: string;
    statsFocus: string;
    statsFocusSub: string;
  };
  projects: {
    title: string;
    featuredCount: string;
    liveDemoGithub: string;
    liveDemo: string;
    githubCode: string;
    caseStudyBtn: string;
    modalClose: string;
    modalOverview: string;
    modalProblem: string;
    modalArchitecture: string;
    modalSchema: string;
    modalChallenges: string;
    modalImpact: string;
    linkPending: string;
  };
  skills: {
    title: string;
    subtitle: string;
    frontend: string;
    backend: string;
    database: string;
    tools: string;
  };
  skillsAndContact: {
    skillsTitle: string;
    connectTitle: string;
    connectDescription: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
    sendingButton: string;
    successMessage: string;
  };
  footer: {
    builtWith: string;
    rights: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
      lightMode: 'Light',
      darkMode: 'Dark',
      language: 'Language',
    },
    hero: {
      rolePrefix: 'Web Development Studio',
      roleHighlight: 'MODERN WEB EXPERIENCES.',
      subheading: 'Nexa Web creates modern, responsive websites and web applications designed to transform ideas into digital experiences.',
      viewProjects: 'View Projects',
      contactMe: 'Contact Us',
      downloadCv: 'Studio Presentation',
    },
    about: {
      title: 'About Nexa Web',
      subtitle: 'Web development studio focused on building modern, responsive and functional digital experiences.',
      bioParagraph1: 'Nexa Web is a web development studio focused on building modern, responsive and functional digital experiences. We create websites and web applications tailored to different business and project needs.',
      bioParagraph2: 'Our technical capabilities combine responsive design, modern UI engineering, robust APIs, and performant databases. We turn complex project requirements into elegant and scalable digital solutions.',
      experienceTitle: 'Studio Capabilities',
      educationTitle: 'Core Specializations',
      educationDegree: 'Full-Stack Digital Solutions',
      educationSchool: 'Nexa Web Studio',
      educationDesc: 'End-to-end design and engineering: from responsive UI architectures to robust backend REST APIs and secure database modeling.',
      statsProjects: '10+',
      statsProjectsSub: 'Projects Delivered',
      statsExp: '100%',
      statsExpSub: 'Tailored Solutions',
      statsFocus: '100%',
      statsFocusSub: 'Modern Web Stack',
    },
    projects: {
      title: 'Our Projects',
      featuredCount: 'Featured Works',
      liveDemoGithub: 'Live Demo & GitHub',
      liveDemo: 'Live Demo',
      githubCode: 'GitHub',
      caseStudyBtn: 'Project Details & Architecture',
      modalClose: 'Close Details',
      modalOverview: 'Project Overview',
      modalProblem: 'Objectives & Features',
      modalArchitecture: 'Technical Implementation',
      modalSchema: 'Database Models & Logic',
      modalChallenges: 'Key Technical Solutions',
      modalImpact: 'Key Features & Metrics',
      linkPending: 'Link coming soon',
    },
    skills: {
      title: 'Our Skills & Technologies',
      subtitle: 'The technologies and tools utilized by Nexa Web to develop modern web applications.',
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'Database',
      tools: 'Development Tools',
    },
    skillsAndContact: {
      skillsTitle: 'Skills & Tech Stack',
      connectTitle: "LET'S BUILD YOUR NEXT PROJECT",
      connectDescription: "Have an idea or a project in mind? Get in touch with Nexa Web and let's turn your idea into a modern digital experience.",
      namePlaceholder: 'Your Name / Company Name',
      emailPlaceholder: 'Your Email',
      messagePlaceholder: 'Tell us about your project...',
      sendButton: 'Contact Us',
      sendingButton: 'Sending...',
      successMessage: 'Message transmitted successfully! Nexa Web will get back to you shortly.',
    },
    footer: {
      builtWith: 'Web Development Studio',
      rights: 'All rights reserved.',
    },
  },

  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      projects: 'Projets',
      skills: 'Compétences',
      contact: 'Contact',
      lightMode: 'Clair',
      darkMode: 'Sombre',
      language: 'Langue',
    },
    hero: {
      rolePrefix: 'Studio de Développement Web',
      roleHighlight: 'EXPÉRIENCES WEB MODERNES.',
      subheading: 'Nexa Web conçoit des sites web modernes et des applications web réactives, pensés pour transformer vos idées en expériences digitales.',
      viewProjects: 'Voir les Projets',
      contactMe: 'Contactez-nous',
      downloadCv: 'Présentation Studio',
    },
    about: {
      title: 'À Propos de Nexa Web',
      subtitle: 'Studio de développement web spécialisé dans la conception d’expériences digitales modernes, réactives et performantes.',
      bioParagraph1: 'Nexa Web est un studio de développement web spécialisé dans la création d\'expériences digitales modernes, réactives et fonctionnelles. Nous concevons des sites web et des applications adaptés aux besoins spécifiques de chaque projet.',
      bioParagraph2: 'Notre savoir-faire couvre le développement frontend, le développement backend, les solutions e-commerce et l\'intégration d\'APIs. Nous allions architecture logicielle propre et interfaces interactives pour offrir des solutions fiables et évolutives.',
      experienceTitle: 'Expertise Technique',
      educationTitle: 'Domaines d’Intervention',
      educationDegree: 'Solutions Web & Digitales',
      educationSchool: 'Studio Nexa Web',
      educationDesc: 'Ingénierie web de bout en bout : de la conception d’interfaces réactives au développement d’APIs REST sécurisées et bases de données optimisées.',
      statsProjects: '10+',
      statsProjectsSub: 'Projets Réalisés',
      statsExp: '100%',
      statsExpSub: 'Solutions Sur-Mesure',
      statsFocus: '100%',
      statsFocusSub: 'Stack Web Moderne',
    },
    projects: {
      title: 'Nos Projets',
      featuredCount: 'Projets Réalisés',
      liveDemoGithub: 'Démo en Ligne & GitHub',
      liveDemo: 'Live Demo',
      githubCode: 'GitHub',
      caseStudyBtn: 'Détails & Architecture du Projet',
      modalClose: 'Fermer les Détails',
      modalOverview: 'Aperçu du Projet',
      modalProblem: 'Objectifs & Fonctionnalités',
      modalArchitecture: 'Implémentation Technique',
      modalSchema: 'Modèles de Données & Logique',
      modalChallenges: 'Défis Techniques Résolus',
      modalImpact: 'Fonctionnalités Clés & Métriques',
      linkPending: 'Lien bientôt disponible',
    },
    skills: {
      title: 'Compétences & Technologies',
      subtitle: 'Les technologies et outils utilisés par Nexa Web pour développer vos applications web.',
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'Base de données',
      tools: 'Outils de Développement',
    },
    skillsAndContact: {
      skillsTitle: 'Compétences & Stack Tech',
      connectTitle: 'CONSTRUISONS VOTRE PROCHAIN PROJET',
      connectDescription: 'Vous avez une idée ou un projet en tête ? Contactez Nexa Web et transformons votre vision en une expérience digitale moderne.',
      namePlaceholder: 'Votre Nom / Entreprise',
      emailPlaceholder: 'Votre Email',
      messagePlaceholder: 'Parlez-nous de votre projet...',
      sendButton: 'Contactez-nous',
      sendingButton: 'Envoi en cours...',
      successMessage: 'Message envoyé avec succès ! L’équipe Nexa Web vous répondra rapidement.',
    },
    footer: {
      builtWith: 'Studio de Développement Web',
      rights: 'Tous droits réservés.',
    },
  },

  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'عن الاستوديو',
      projects: 'المشاريع',
      skills: 'المهارات',
      contact: 'تواصل معنا',
      lightMode: 'فاتح',
      darkMode: 'داكن',
      language: 'اللغة',
    },
    hero: {
      rolePrefix: 'استوديو تطوير الويب',
      roleHighlight: 'تجارب ويب رقمية حديثة.',
      subheading: 'يقوم استوديو نيكسا ويب (Nexa Web) بإنشاء مواقع وتطبيقات ويب عصرية ومتجاوبة مصممة لتحويل الأفكار إلى تجارب رقمية مميزة.',
      viewProjects: 'عرض المشاريع',
      contactMe: 'تواصل معنا',
      downloadCv: 'الملف التعريفي',
    },
    about: {
      title: 'عن نيكسا ويب',
      subtitle: 'استوديو تطوير برمجيات متخصص في بناء تجارب رقمية عصرية، سريعة وعالية الكفاءة.',
      bioParagraph1: 'نيكسا ويب (Nexa Web) هو استوديو متخصص في تطوير الويب يركز على بناء تجارب رقمية حديثة، متجاوبة وعملية. نحن نبتكر مواقع وتطبيقات ويب مخصصة لتلبية متطلبات مختلف الأنشطة والمشاريع.',
      bioParagraph2: 'تشمل مجالات خبرتنا بناء تطبيقات الويب المتكاملة، منصات التجارة الإلكترونية، وربط واجهات برمجة التطبيقات (APIs). نجمع بين الكود النظيف، الواجهات التفاعلية والأداء الفائق لتقديم حلول رقمية موثوقة.',
      experienceTitle: 'القدرات التقنية',
      educationTitle: 'مجالات التخصص والخدمات',
      educationDegree: 'حلول الويب المتكاملة',
      educationSchool: 'استوديو نيكسا ويب',
      educationDesc: 'تطوير تقني متكامل وشامل: من تصميم واجهات المستخدم التفاعلية إلى برمجة الخوادم وقواعد البيانات المحمية.',
      statsProjects: '+10',
      statsProjectsSub: 'مشاريع منجزة',
      statsExp: '100%',
      statsExpSub: 'حلول مخصصة',
      statsFocus: '100%',
      statsFocusSub: 'تقنيات ويب حديثة',
    },
    projects: {
      title: 'مشاريعنا',
      featuredCount: 'مشاريع بارزة',
      liveDemoGithub: 'النموذج المباشر وكود GitHub',
      liveDemo: 'Live Demo',
      githubCode: 'GitHub',
      caseStudyBtn: 'تفاصيل ومعمارية المشروع',
      modalClose: 'إغلاق التفاصيل',
      modalOverview: 'نظرة عامة على المشروع',
      modalProblem: 'الأهداف والخصائص',
      modalArchitecture: 'التنفيذ التقني والمعمارية',
      modalSchema: 'نماذج البيانات والمنطق البرمجي',
      modalChallenges: 'التحديات البرمجية والحلول',
      modalImpact: 'أهم الميزات والمؤشرات',
      linkPending: 'الرابط سيتوفر قريباً',
    },
    skills: {
      title: 'المهارات والتقنيات',
      subtitle: 'التقنيات والأدوات المعتمدة التي يوظفها استوديو نيكسا ويب في تطوير تطبيقات الويب الحديثة.',
      frontend: 'الواجهة الأمامية (Frontend)',
      backend: 'الخلفية البرمجية (Backend)',
      database: 'قواعد البيانات (Database)',
      tools: 'أدوات التطوير (Tools)',
    },
    skillsAndContact: {
      skillsTitle: 'المهارات والتقنيات',
      connectTitle: 'لنبدأ مشروعك الرقمي القادم',
      connectDescription: 'هل لديك فكرة أو مشروع في ذهنك؟ تواصل مع استوديو نيكسا ويب (Nexa Web) ودعنا نحول فكرتك إلى تجربة رقمية متطورة.',
      namePlaceholder: 'الاسم أو اسم المؤسسة',
      emailPlaceholder: 'بريدك الإلكتروني',
      messagePlaceholder: 'أخبرنا عن فكرة مشروعك...',
      sendButton: 'تواصل معنا',
      sendingButton: 'جاري الإرسال...',
      successMessage: 'تم إرسال رسالتك بنجاح! سيتواصل معك فريق نيكسا ويب قريباً.',
    },
    footer: {
      builtWith: 'استوديو تطوير الويب',
      rights: 'جميع الحقوق محفوظة.',
    },
  },
};
