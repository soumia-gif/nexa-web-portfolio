import { Skill } from '../types';

export const skillsData: Skill[] = [
  // ==========================================
  // FRONTEND
  // ==========================================
  {
    name: 'HTML5',
    category: 'frontend',
    level: 'Core',
    highlight: true,
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
    context: {
      en: 'Interactive micro-interactions, dark/light theme switching, and glassmorphic aesthetic interfaces.',
      fr: 'Interfaces interactives, gestion fluide des thèmes sombre/clair et micro-animations esthétiques.',
      ar: 'واجهات مستخدم تفاعلية، دعم التبديل بين الوضع الليلي والنهاري، وتأثيرات بصرية راقية.',
    },
  },

  // ==========================================
  // BACKEND
  // ==========================================
  {
    name: 'Node.js',
    category: 'backend',
    level: 'Core',
    highlight: true,
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
    context: {
      en: 'Complete Create, Read, Update, and Delete operations with validation and error handling.',
      fr: 'Opérations complètes de création, lecture, mise à jour et suppression avec validation stricte.',
      ar: 'تنفيذ شامل لعمليات الإنشاء والقراءة والتعديل والحذف مع التحقق الصارم من صحة البيانات.',
    },
  },

  // ==========================================
  // DATABASE
  // ==========================================
  {
    name: 'MongoDB',
    category: 'database',
    level: 'Core',
    highlight: true,
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
    context: {
      en: 'Entity-relationship design, sub-document structures, and optimized queries for scalability.',
      fr: 'Conception relationnelle, structuration de sous-documents et requêtes évolutives.',
      ar: 'تصميم الكيانات والعلاقات، هيكلة المستندات الفرعية، وتحسين الاستعلامات للتوسع المستقبلي.',
    },
  },

  // ==========================================
  // DEVELOPMENT TOOLS
  // ==========================================
  {
    name: 'Git',
    category: 'tools',
    level: 'Tooling',
    highlight: false,
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
    context: {
      en: 'Node package manager for managing dependencies, scripts, and build workflows.',
      fr: 'Gestionnaire de paquets Node pour l’installation des dépendances et les scripts de build.',
      ar: 'مدير حزم Node.js لإدارة التبعيات والمكتبات البرمجية وأتمتة أوامر البناء.',
    },
  },
];
