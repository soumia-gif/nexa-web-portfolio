import mongoose from 'mongoose';
import { env } from './config/env.js';
import { Profile } from './models/Profile.js';
import { Project } from './models/Project.js';
import { Skill } from './models/Skill.js';
import { Settings } from './models/Settings.js';

async function migrate() {
  console.log('🔄 Connecting to MongoDB...');
  await mongoose.connect(env.MONGO_URI);
  console.log('✅ Connected to MongoDB.');

  // 1. Update Profile
  const profileData = {
    fullName: 'Nexa Web',
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
    email: 'contact@nexaweb.dz',
    avatarUrl: '',
    resumeUrl: '',
    phone: '',
    phoneEnabled: false,
    location: 'Algeria',
    socialLinks: {
      github: 'https://github.com/nexaweb',
      instagram: 'https://instagram.com/nexaweb.dz',
      linkedin: '',
      twitter: '',
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

  const existingProfile = await Profile.findOne();
  if (existingProfile) {
    await Profile.updateOne({ _id: existingProfile._id }, { $set: profileData });
    console.log('✅ Profile updated to Nexa Web studio identity.');
  } else {
    await Profile.create(profileData);
    console.log('✅ Profile created for Nexa Web studio.');
  }

  // 2. Update Projects GitHub links
  await Project.updateOne(
    { slug: 'tsla-ecom' },
    {
      $set: {
        githubUrl: 'https://github.com/nexaweb/tsla-ecom',
        'caseStudy.githubUrl': 'https://github.com/nexaweb/tsla-ecom',
      },
    }
  );
  await Project.updateOne(
    { slug: 'tsla-restaurant' },
    {
      $set: {
        githubUrl: 'https://github.com/nexaweb/tsla-restaurant',
        'caseStudy.githubUrl': 'https://github.com/nexaweb/tsla-restaurant',
      },
    }
  );
  await Project.updateOne(
    { slug: 'adrenaline-salle' },
    {
      $set: {
        githubUrl: '',
        'caseStudy.githubUrl': '',
      },
    }
  );
  await Project.updateOne(
    { slug: 'mes-recettes' },
    {
      $set: {
        githubUrl: '',
        'caseStudy.githubUrl': '',
      },
    }
  );
  await Project.updateOne(
    { slug: 'meteo-app' },
    {
      $set: {
        githubUrl: '',
        'caseStudy.githubUrl': '',
      },
    }
  );
  console.log('✅ Projects GitHub links updated to Nexa Web.');

  // 3. Update Skills in Database
  const newSkills = [
    // Frontend
    {
      name: 'HTML5',
      category: 'frontend',
      level: 'Core',
      highlight: true,
      icon: 'Code',
      order: 1,
      context: {
        en: 'Semantic HTML5 structure, web accessibility, and modern SEO-friendly markup.',
        fr: 'Structure sémantique HTML5, accessibilité web et balisage optimisé pour le référencement.',
        ar: 'هيكلة دلالية متقدمة عبر HTML5، معايير إمكانية الوصول والتوافق مع محركات البحث.',
      },
    },
    {
      name: 'CSS3',
      category: 'frontend',
      level: 'Core',
      highlight: true,
      icon: 'Palette',
      order: 2,
      context: {
        en: 'Responsive layouts, Flexbox, CSS Grid, smooth transitions, and modern styling architectures.',
        fr: 'Mises en page réactives, Flexbox, Grid, transitions fluides et architecture CSS moderne.',
        ar: 'تصاميم متجاوبة مع كافة الشاشات، Flexbox، CSS Grid، حركات سلسة وتنسيقات عصرية.',
      },
    },
    {
      name: 'JavaScript',
      category: 'frontend',
      level: 'Core',
      highlight: true,
      icon: 'Code2',
      order: 3,
      context: {
        en: 'Modern ES6+ syntax, asynchronous programming (async/await, Promises), and dynamic DOM handling.',
        fr: 'JavaScript moderne (ES6+), programmation asynchrone (async/await) et logique dynamique.',
        ar: 'جافاسكريبت الحديثة (ES6+)، البرمجة غير المتزامنة والمنطق البرمجي التفاعلي.',
      },
    },
    {
      name: 'React.js',
      category: 'frontend',
      level: 'Core',
      highlight: true,
      icon: 'Atom',
      order: 4,
      context: {
        en: 'Reusable component architecture, custom hooks, reactive state management, and SPA performance.',
        fr: 'Composants modulaires et réutilisables, hooks React, gestion d’état et applications réactives.',
        ar: 'مكونات وظيفية قابلة لإعادة الاستخدام، خطافات تفاعلية، وإدارة الحالة لتطبيقات الويب السريعة.',
      },
    },
    {
      name: 'Responsive Web Design',
      category: 'frontend',
      level: 'Core',
      highlight: true,
      icon: 'Layers',
      order: 5,
      context: {
        en: 'Mobile-first design principles ensuring fluid experiences across mobile, tablet, and desktop.',
        fr: 'Conception mobile-first garantissant une expérience fluide sur smartphone, tablette et écran large.',
        ar: 'تصميم متوافق مع مبدأ Mobile-First لتجربة سلسة ومثالية على الهواتف والأجهزة اللوحية والحواسيب.',
      },
    },
    {
      name: 'Modern UI Development',
      category: 'frontend',
      level: 'Core',
      highlight: true,
      icon: 'Sparkles',
      order: 6,
      context: {
        en: 'Interactive micro-interactions, dark/light theme switching, and glassmorphic aesthetic interfaces.',
        fr: 'Interfaces interactives, gestion fluide des thèmes sombre/clair et micro-animations esthétiques.',
        ar: 'واجهات مستخدم تفاعلية، دعم التبديل بين الوضع الليلي والنهاري، وتأثيرات بصرية راقية.',
      },
    },

    // Backend
    {
      name: 'Node.js',
      category: 'backend',
      level: 'Core',
      highlight: true,
      icon: 'Server',
      order: 7,
      context: {
        en: 'High-performance asynchronous server-side runtime for robust web backends.',
        fr: 'Environnement d’exécution serveur haute performance pour des backends fiables et rapides.',
        ar: 'بيئة تشغيل عالية الأداء للخوادم البرمجية ومعالجة الطلبات غير المتزامنة بسرعة وكفاءة.',
      },
    },
    {
      name: 'Express.js',
      category: 'backend',
      level: 'Core',
      highlight: true,
      icon: 'Server',
      order: 8,
      context: {
        en: 'RESTful API routing, modular middleware architecture, and secure request pipelines.',
        fr: 'Routage d’APIs RESTful, middlewares modulaires et gestion sécurisée des requêtes HTTP.',
        ar: 'بناء واجهات RESTful، تصميم البرمجيات الوسيطة وتأمين مسارات الخادم ومعالجة الطلبات.',
      },
    },
    {
      name: 'REST APIs',
      category: 'backend',
      level: 'Core',
      highlight: true,
      icon: 'Globe',
      order: 9,
      context: {
        en: 'Standardized HTTP status codes, structured JSON payloads, and clean resource endpoints.',
        fr: 'Conception d’APIs REST standardisées, réponses JSON structurées et endpoints optimisés.',
        ar: 'معايير REST الاحترافية، استجابات JSON منظمة، وهيكلة واضحة لنقاط النهاية (Endpoints).',
      },
    },
    {
      name: 'API Integration',
      category: 'backend',
      level: 'Core',
      highlight: true,
      icon: 'Layers',
      order: 10,
      context: {
        en: 'Connecting third-party services, webhooks, payment flows, and external data feeds.',
        fr: 'Intégration transparente de services tiers, webhooks et flux de données externes.',
        ar: 'ربط الخدمات الخارجية، واجهات برمجة التطبيقات للجهات الخارجية وتدفق البيانات الفوري.',
      },
    },
    {
      name: 'Authentication',
      category: 'backend',
      level: 'Core',
      highlight: true,
      icon: 'Shield',
      order: 11,
      context: {
        en: 'JWT token-based auth, password hashing with bcrypt, protected routes, and session security.',
        fr: 'Authentification JWT, hachage sécurisé des mots de passe et sécurisation des routes privées.',
        ar: 'أنظمة المصادقة عبر رموز JWT، تشفير كلمات المرور، وحماية المسارات الحساسة.',
      },
    },
    {
      name: 'CRUD Operations',
      category: 'backend',
      level: 'Core',
      highlight: true,
      icon: 'Database',
      order: 12,
      context: {
        en: 'Complete Create, Read, Update, and Delete operations with validation and error handling.',
        fr: 'Opérations complètes de création, lecture, mise à jour et suppression avec validation stricte.',
        ar: 'تنفيذ شامل لعمليات الإنشاء والقراءة والتعديل والحذف مع التحقق الصارم من صحة البيانات.',
      },
    },

    // Database
    {
      name: 'MongoDB',
      category: 'database',
      level: 'Core',
      highlight: true,
      icon: 'Database',
      order: 13,
      context: {
        en: 'NoSQL document database, flexible document collections, indexing, and high availability.',
        fr: 'Base de données NoSQL orientée documents, collections flexibles, indexation et persistance.',
        ar: 'قواعد بيانات NoSQL مرنة تعتمد على المستندات، مع فهارس متقدمة وحفظ موثوق للبيانات.',
      },
    },
    {
      name: 'Mongoose',
      category: 'database',
      level: 'Core',
      highlight: true,
      icon: 'Layers',
      order: 14,
      context: {
        en: 'Schema modeling, strict data validation, population, and business logic methods for Node.js.',
        fr: 'Modélisation de schémas, validation stricte des données et population relationnelle.',
        ar: 'نمذجة المخططات الهيكلية (Schemas)، التحقق من صحة المدخلات وإدارة علاقات البيانات.',
      },
    },
    {
      name: 'Database Management',
      category: 'database',
      level: 'Core',
      highlight: true,
      icon: 'Database',
      order: 15,
      context: {
        en: 'Database structure optimization, data backups, and query performance tuning.',
        fr: 'Organisation et optimisation des bases de données pour garantir rapidité et intégrité.',
        ar: 'إدارة وتحسين قواعد البيانات وضمان سلامة واستقرار البيانات وسرعة استعلامها.',
      },
    },
    {
      name: 'Data Modeling',
      category: 'database',
      level: 'Core',
      highlight: true,
      icon: 'Layers',
      order: 16,
      context: {
        en: 'Entity-relationship design, sub-document structures, and optimized queries for scalability.',
        fr: 'Conception relationnelle, structuration de sous-documents et requêtes évolutives.',
        ar: 'تصميم الكيانات والعلاقات، هيكلة المستندات الفرعية، وتحسين الاستعلامات للتوسع المستقبلي.',
      },
    },

    // Tools
    {
      name: 'Git',
      category: 'tools',
      level: 'Tooling',
      highlight: false,
      icon: 'GitBranch',
      order: 17,
      context: {
        en: 'Distributed version control, branch workflows, committing, and change tracking.',
        fr: 'Contrôle de version distribué, gestion rigoureuse des branches et suivi de l’historique.',
        ar: 'نظام التحكم بالإصدارات، إدارة الفروع، وتتبع التعديلات بدقة وأمان.',
      },
    },
    {
      name: 'GitHub',
      category: 'tools',
      level: 'Tooling',
      highlight: false,
      icon: 'Github',
      order: 18,
      context: {
        en: 'Remote repository hosting, release management, and collaborative code pipelines.',
        fr: 'Hébergement de dépôts distants, gestion des versions et collaboration technique.',
        ar: 'استضافة المستودعات السحابية، إدارة الإصدارات والتعاون البرمجي الاحترافي.',
      },
    },
    {
      name: 'VS Code',
      category: 'tools',
      level: 'Tooling',
      highlight: false,
      icon: 'Terminal',
      order: 19,
      context: {
        en: 'Primary integrated development environment with linting, extensions, and debugging.',
        fr: 'Environnement de développement moderne avec débogage, extensions et analyse de code.',
        ar: 'بيئة التطوير المتكاملة الأساسية مع أدوات التحليل، الإضافات وتصحيح الأخطاء.',
      },
    },
    {
      name: 'Thunder Client',
      category: 'tools',
      level: 'Tooling',
      highlight: false,
      icon: 'Terminal',
      order: 20,
      context: {
        en: 'In-editor API client for verifying HTTP endpoints, request payloads, and auth headers.',
        fr: 'Testeur d’APIs intégré pour valider les routes HTTP, les headers et les réponses JSON.',
        ar: 'أداة اختبار واجهات برمجة التطبيقات، والتحقق من صحة الطلبات واستجابات الخادم.',
      },
    },
    {
      name: 'npm',
      category: 'tools',
      level: 'Tooling',
      highlight: false,
      icon: 'Terminal',
      order: 21,
      context: {
        en: 'Node package manager for managing dependencies, scripts, and build workflows.',
        fr: 'Gestionnaire de paquets Node pour l’installation des dépendances et les scripts de build.',
        ar: 'مدير حزم Node.js لإدارة التبعيات والمكتبات البرمجية وأتمتة أوامر البناء.',
      },
    },
  ];

  await Skill.deleteMany({});
  await Skill.insertMany(newSkills);
  console.log(`✅ Skills refreshed with ${newSkills.length} official Nexa Web technologies.`);

  // 4. Update Settings
  const settingsData = {
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
  };

  const existingSettings = await Settings.findOne();
  if (existingSettings) {
    await Settings.updateOne({ _id: existingSettings._id }, { $set: settingsData });
    console.log('✅ Settings updated to Nexa Web configuration.');
  } else {
    await Settings.create(settingsData);
    console.log('✅ Settings created for Nexa Web.');
  }

  console.log('\n🎉 ALL DATABASE DATA HAS BEEN MIGRATED TO NEXA WEB!');
  await mongoose.disconnect();
  process.exit(0);
}

migrate().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
