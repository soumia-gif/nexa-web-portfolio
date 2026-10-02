export const getDefaultProfile = (userData = {}) => {
  const name = userData.fullName || userData.username || 'Nexa Web';
  const email = userData.email || 'contact@nexaweb.dz';

  return {
    fullName: name,
    rolePrefix: {
      en: 'Web Development Studio',
      ar: 'استوديو تطوير الويب',
      fr: 'Studio de Développement Web',
    },
    roleHighlight: {
      en: 'MODERN WEB EXPERIENCES.',
      ar: 'تجارب ويب رقمية حديثة.',
      fr: 'EXPÉRIENCES WEB MODERNES.',
    },
    subheading: {
      en: 'Nexa Web creates modern, responsive websites and web applications designed to transform ideas into digital experiences.',
      ar: 'يقوم استوديو نيكسا ويب (Nexa Web) بإنشاء مواقع وتطبيقات ويب عصرية ومتجاوبة مصممة لتحويل الأفكار إلى تجارب رقمية مميزة.',
      fr: 'Nexa Web conçoit des sites web modernes et des applications web réactives, pensés pour transformer vos idées en expériences digitales.',
    },
    email,
    location: userData.location || 'Algeria',
    phone: '',
    phoneEnabled: false,
    avatarUrl: '',
    resumeUrl: '',
    socialLinks: {
      github: 'https://github.com/nexaweb',
      linkedin: 'https://linkedin.com',
      twitter: '',
      instagram: 'https://instagram.com/nexaweb.dz',
    },
    socialLinksList: [
      {
        platform: 'instagram',
        title: 'Instagram',
        url: 'https://instagram.com/nexaweb.dz',
        icon: 'instagram',
        enabled: true,
        order: 1,
      },
      {
        platform: 'github',
        title: 'GitHub',
        url: 'https://github.com/nexaweb',
        icon: 'github',
        enabled: true,
        order: 2,
      },
      {
        platform: 'linkedin',
        title: 'LinkedIn',
        url: 'https://linkedin.com',
        icon: 'linkedin',
        enabled: true,
        order: 3,
      },
    ],
    stats: {
      yearsExperience: '100%',
      yearsExperienceLabel: {
        en: 'Tailored Solutions',
        ar: 'حلول مخصصة',
        fr: 'Solutions Sur-Mesure',
      },
      completedProjects: '10+',
      completedProjectsLabel: {
        en: 'Projects Delivered',
        ar: 'مشاريع منجزة',
        fr: 'Projets Réalisés',
      },
      codeCommits: '100%',
      codeCommitsLabel: {
        en: 'Modern Web Stack',
        ar: 'تقنيات ويب حديثة',
        fr: 'Stack Web Moderne',
      },
    },
    aboutBio: {
      paragraph1: {
        en: 'Nexa Web is a web development studio focused on building modern, responsive and functional digital experiences. We create websites and web applications tailored to different business and project needs.',
        ar: 'نيكسا ويب (Nexa Web) هو استوديو متخصص في تطوير الويب يركز على بناء تجارب رقمية حديثة، متجاوبة وعملية. نحن نبتكر مواقع وتطبيقات ويب مخصصة لتلبية متطلبات مختلف الأنشطة والمشاريع.',
        fr: 'Nexa Web est un studio de développement web spécialisé dans la création d\'expériences digitales modernes, réactives et fonctionnelles. Nous concevons des sites web et des applications adaptés aux besoins spécifiques de chaque projet.',
      },
      paragraph2: {
        en: 'Our development expertise covers full-stack web applications, e-commerce platforms, and bespoke digital solutions. We combine clean architecture, intuitive interfaces, and fast performance using modern technologies like React, Node.js, Express, and MongoDB.',
        ar: 'تشمل مجالات خبرتنا بناء تطبيقات الويب المتكاملة، منصات التجارة الإلكترونية، والحلول الرقمية المصممة حسب الطلب. نجمع بين الكود النظيف، الواجهات التفاعلية والأداء الفائق باستخدام React و Node.js و Express و MongoDB.',
        fr: 'Notre expertise couvre la conception d\'applications web full-stack, de plateformes e-commerce et de solutions digitales sur-mesure. Nous allions architecture logicielle propre, interfaces intuitives et performances optimales grâce aux technologies éprouvées (React, Node.js, Express, MongoDB).',
      },
    },
    education: {
      title: {
        en: 'Core Specializations',
        ar: 'مجالات التخصص والخدمات',
        fr: 'Domaines d’Intervention',
      },
      school: {
        en: 'Nexa Web Studio',
        ar: 'استوديو نيكسا ويب',
        fr: 'Studio Nexa Web',
      },
      degree: {
        en: 'Full-Stack Digital Solutions',
        ar: 'حلول الويب المتكاملة',
        fr: 'Solutions Web & Digitales',
      },
      status: {
        en: 'Active Studio',
        ar: 'خدمات معتمدة',
        fr: 'Studio Actif',
      },
      description: {
        en: 'End-to-end design and engineering: from responsive UI architectures to robust backend REST APIs and secure database modeling.',
        ar: 'تطوير تقني متكامل وشامل: من تصميم واجهات المستخدم التفاعلية إلى برمجة الخوادم وقواعد البيانات المحمية.',
        fr: 'Ingénierie web de bout en bout : de la conception d’interfaces réactives au développement d’APIs REST sécurisées et bases de données optimisées.',
      },
      highlights: [
        {
          en: 'Modern Web Development',
          ar: 'تطوير مواقع الويب الحديثة',
          fr: 'Développement Web Moderne',
        },
        {
          en: 'Responsive Design',
          ar: 'تصميم متجاوب لكافة الشاشات',
          fr: 'Design Réactif & Multi-Écrans',
        },
        {
          en: 'Web Applications',
          ar: 'تطبيقات الويب المتكاملة',
          fr: 'Applications Web Interactives',
        },
        {
          en: 'E-commerce Solutions',
          ar: 'حلول المتاجر والتجارة الإلكترونية',
          fr: 'Solutions E-commerce',
        },
        {
          en: 'Frontend Development',
          ar: 'تطوير الواجهات الأمامية (React)',
          fr: 'Développement Frontend (React)',
        },
        {
          en: 'Backend Development',
          ar: 'تطوير الخوادم البرمجية (Node / Express)',
          fr: 'Développement Backend (Node / Express)',
        },
        {
          en: 'API Integration',
          ar: 'ربط واجهات برمجة التطبيقات (APIs)',
          fr: 'Intégration d’APIs & Services',
        },
      ],
    },
  };
};

export const getDefaultSettings = () => ({
  backgroundTheme: 'midnight-orchid',
  sections: [
    { id: 'hero', label: { en: 'Hero Banner', fr: 'Bannière Principale', ar: 'الواجهة الرئيسية' }, enabled: true, order: 1 },
    { id: 'about', label: { en: 'About Nexa Web', fr: 'À Propos de Nexa Web', ar: 'عن نيكسا ويب' }, enabled: true, order: 2 },
    { id: 'projects', label: { en: 'Our Projects', fr: 'Nos Projets', ar: 'مشاريعنا' }, enabled: true, order: 3 },
    { id: 'skills', label: { en: 'Skills & Tech', fr: 'Compétences & Tech', ar: 'المهارات والتقنيات' }, enabled: true, order: 4 },
    { id: 'cv', label: { en: 'Studio Presentation', fr: 'Présentation Studio', ar: 'الملف التعريفي' }, enabled: true, order: 5 },
    { id: 'contact', label: { en: 'Contact Us', fr: 'Contactez-nous', ar: 'تواصل معنا' }, enabled: true, order: 6 },
  ],
  cvSettings: {
    enabled: true,
    fileName: 'Nexa_Web_Studio_Presentation.pdf',
    title: {
      en: 'Official Studio Presentation (PDF)',
      fr: 'Présentation Officielle Nexa Web (PDF)',
      ar: 'الملف التعريفي لاستوديو نيكسا ويب (PDF)',
    },
    description: {
      en: 'Download our official studio presentation in PDF format to discover our web development services, technical proficiencies, and past projects.',
      fr: 'Téléchargez la présentation officielle de Nexa Web au format PDF pour découvrir nos services de développement web, nos compétences techniques et nos réalisations.',
      ar: 'قم بتحميل الملف التعريفي الكامل لاستوديو نيكسا ويب بصيغة PDF للاطلاع على خدماتنا البرمجية، مجالات خبرتنا وأبرز مشاريعنا.',
    },
  },
});

export const getDefaultProjects = () => [
  {
    slug: 'e-commerce-hub',
    flagship: true,
    coverGradient: 'from-pink-900/50 via-purple-950/40 to-rose-950/40',
    category: 'Full-Stack',
    badge: 'Full-Stack / E-commerce',
    image: '',
    title: {
      en: 'Modern E-commerce Platform',
      fr: 'Plateforme E-commerce Moderne',
      ar: 'منصة تجارة إلكترونية متكاملة',
    },
    subtitle: {
      en: 'Full-featured online store with payment gateway, order tracking, and administrative inventory controls.',
      fr: 'Boutique en ligne complète avec filtres de produits, suivi des commandes et gestion des stocks.',
      ar: 'متجر إلكتروني شامل مع تصفية المنتجات، تتبع الطلبات ولوحة إدارة المخزون.',
    },
    summary: {
      en: 'A high-performance e-commerce web application featuring real-time search, bilingual localization, and full order lifecycle tracking.',
      fr: 'Une application e-commerce performante avec recherche en direct, support multilingue et suivi des commandes.',
      ar: 'تطبيق ويب تجارة إلكترونية عالي السرعة يدعم التصفية الفورية واللغات المتعددة وتتبع الطلبيات.',
    },
    metrics: [
      { label: 'Architecture', value: 'MERN Stack' },
      { label: 'Security', value: 'JWT & Bcrypt' },
      { label: 'Database', value: 'Isolated MongoDB' },
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    order: 1,
  },
  {
    slug: 'saas-dashboard-pro',
    flagship: false,
    coverGradient: 'from-purple-900/50 via-indigo-950/40 to-blue-950/40',
    category: 'Full-Stack',
    badge: 'SaaS / Analytics',
    image: '',
    title: {
      en: 'Analytics & Management SaaS',
      fr: 'Dashboard SaaS & Analytics',
      ar: 'لوحة تحكم وتحليلات سحابية',
    },
    subtitle: {
      en: 'Real-time administrative control center with metrics charting and role-based access.',
      fr: 'Centre de contrôle administratif avec graphiques de métriques et gestion des accès.',
      ar: 'مركز تحكم إداري مع رسوم بيانية تفاعلية وإدارة صلاحيات المستخدمين.',
    },
    summary: {
      en: 'Enterprise dashboard interface built with responsive data visualization and modular components.',
      fr: 'Tableau de bord d\'entreprise interactif avec visualisation des données en temps réel.',
      ar: 'لوحة بيانات تفاعلية مع عرض فوري للبيانات وإدارة متقدمة للعمليات.',
    },
    metrics: [
      { label: 'Performance', value: 'Sub-second' },
      { label: 'Charts', value: 'Interactive' },
    ],
    techStack: ['React', 'TypeScript', 'Express', 'MongoDB'],
    order: 2,
  },
];

export const getDefaultSkills = () => [
  {
    name: 'React.js',
    category: 'frontend',
    level: 'Core',
    highlight: true,
    icon: 'Atom',
    order: 1,
    context: {
      en: 'Component-based architecture, hooks, state management, and modern SPA design.',
      fr: 'Architecture par composants, hooks, gestion d’état et conception de SPA modernes.',
      ar: 'هندسة المكونات، الخطافات التفاعلية، إدارة الحالة وتصميم تطبيقات الويب أحادية الصفحة.',
    },
  },
  {
    name: 'HTML5 & CSS3',
    category: 'frontend',
    level: 'Core',
    highlight: true,
    icon: 'Code',
    order: 2,
    context: {
      en: 'Semantic markup, accessible structure, responsive grid layouts, and modern animations.',
      fr: 'Balisage sémantique, structure accessible, grilles réactives et animations soignées.',
      ar: 'هيكلة دلالية، تخطيطات شبكية متجاوبة، وتنسيقات عصرية متوافقة مع كافة الشاشات.',
    },
  },
  {
    name: 'Node.js & Express',
    category: 'backend',
    level: 'Core',
    highlight: true,
    icon: 'Server',
    order: 3,
    context: {
      en: 'High-performance RESTful APIs, custom middlewares, and secure JWT authentication.',
      fr: 'APIs RESTful performantes, middlewares personnalisés et authentification JWT sécurisée.',
      ar: 'بناء واجهات برمجية RESTful سريعة، برمجيات وسيطة وتأمين الصلاحيات بـ JWT.',
    },
  },
  {
    name: 'MongoDB & Mongoose',
    category: 'database',
    level: 'Core',
    highlight: true,
    icon: 'Database',
    order: 4,
    context: {
      en: 'Document data modeling, schemas, indexing, and aggregation pipelines.',
      fr: 'Modélisation NoSQL, schémas de données, indexation et requêtes d’agrégation.',
      ar: 'تصميم قواعد البيانات الوثائقية، المخططات الهيكلية وفهارس الأداء العالي.',
    },
  },
  {
    name: 'Git & GitHub',
    category: 'tools',
    level: 'Core',
    highlight: true,
    icon: 'GitBranch',
    order: 5,
    context: {
      en: 'Version control, collaborative workflows, and repository management.',
      fr: 'Gestion de versions, travail collaboratif et hébergement sécurisé des dépôts.',
      ar: 'إدارة الإصدارات، سير العمل الجماعي واستضافة الأكواد السحابية.',
    },
  },
];
