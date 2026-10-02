import mongoose from 'mongoose';

export const profileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      default: 'Nexa Web',
    },
    rolePrefix: {
      en: { type: String, default: 'Web Development Studio' },
      ar: { type: String, default: 'استوديو تطوير الويب' },
      fr: { type: String, default: 'Studio de Développement Web' },
    },
    roleHighlight: {
      en: { type: String, default: 'MODERN WEB EXPERIENCES.' },
      ar: { type: String, default: 'تجارب ويب رقمية حديثة.' },
      fr: { type: String, default: 'EXPÉRIENCES WEB MODERNES.' },
    },
    subheading: {
      en: {
        type: String,
        default:
          'Nexa Web creates modern, responsive websites and web applications designed to transform ideas into digital experiences.',
      },
      ar: {
        type: String,
        default:
          'يقوم استوديو نيكسا ويب (Nexa Web) بإنشاء مواقع وتطبيقات ويب عصرية ومتجاوبة مصممة لتحويل الأفكار إلى تجارب رقمية مميزة.',
      },
      fr: {
        type: String,
        default:
          'Nexa Web conçoit des sites web modernes et des applications web réactives, pensés pour transformer vos idées en expériences digitales.',
      },
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    resumeUrl: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: 'contact@nexaweb.dz',
    },
    phone: {
      type: String,
      default: '',
      required: false,
    },
    phoneEnabled: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      default: 'Algeria',
    },
    socialLinks: {
      github: { type: String, default: 'https://github.com/nexaweb' },
      linkedin: { type: String, default: 'https://linkedin.com' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: 'https://instagram.com/nexaweb.dz' },
    },
    socialLinksList: [
      {
        platform: { type: String, required: true },
        title: { type: String, default: '' },
        url: { type: String, required: true },
        icon: { type: String, default: 'globe' },
        enabled: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
      },
    ],
    stats: {
      yearsExperience: { type: String, default: '100%' },
      yearsExperienceLabel: {
        en: { type: String, default: 'Tailored Solutions' },
        ar: { type: String, default: 'حلول مخصصة' },
        fr: { type: String, default: 'Solutions Sur-Mesure' },
      },
      completedProjects: { type: String, default: '10+' },
      completedProjectsLabel: {
        en: { type: String, default: 'Projects Delivered' },
        ar: { type: String, default: 'مشاريع منجزة' },
        fr: { type: String, default: 'Projets Réalisés' },
      },
      codeCommits: { type: String, default: '100%' },
      codeCommitsLabel: {
        en: { type: String, default: 'Modern Web Stack' },
        ar: { type: String, default: 'تقنيات ويب حديثة' },
        fr: { type: String, default: 'Stack Web Moderne' },
      },
    },
    aboutBio: {
      paragraph1: {
        en: {
          type: String,
          default:
            'Nexa Web is a web development studio focused on building modern, responsive and functional digital experiences. We create websites and web applications tailored to different business and project needs.',
        },
        ar: {
          type: String,
          default:
            'نيكسا ويب (Nexa Web) هو استوديو متخصص في تطوير الويب يركز على بناء تجارب رقمية حديثة، متجاوبة وعملية. نحن نبتكر مواقع وتطبيقات ويب مخصصة لتلبية متطلبات مختلف الأنشطة والمشاريع.',
        },
        fr: {
          type: String,
          default:
            'Nexa Web est un studio de développement web spécialisé dans la création d\'expériences digitales modernes, réactives et fonctionnelles. Nous concevons des sites web et des applications adaptés aux besoins spécifiques de chaque projet.',
        },
      },
      paragraph2: {
        en: {
          type: String,
          default:
            'Our development expertise covers full-stack web applications, e-commerce platforms, and bespoke digital solutions. We combine clean architecture, intuitive interfaces, and fast performance using modern technologies like React, Node.js, Express, and MongoDB.',
        },
        ar: {
          type: String,
          default:
            'تشمل مجالات خبرتنا بناء تطبيقات الويب المتكاملة، منصات التجارة الإلكترونية، والحلول الرقمية المصممة حسب الطلب. نجمع بين الكود النظيف، الواجهات التفاعلية والأداء الفائق باستخدام React و Node.js و Express و MongoDB.',
        },
        fr: {
          type: String,
          default:
            'Notre expertise couvre la conception d\'applications web full-stack, de plateformes e-commerce et de solutions digitales sur-mesure. Nous allions architecture logicielle propre, interfaces intuitives et performances optimales grâce aux technologies éprouvées (React, Node.js, Express, MongoDB).',
        },
      },
    },
    education: {
      title: {
        en: { type: String, default: 'Core Specializations' },
        ar: { type: String, default: 'مجالات التخصص والخدمات' },
        fr: { type: String, default: 'Domaines d’Intervention' },
      },
      school: {
        en: { type: String, default: 'Nexa Web Studio' },
        ar: { type: String, default: 'استوديو نيكسا ويب' },
        fr: { type: String, default: 'Studio Nexa Web' },
      },
      degree: {
        en: { type: String, default: 'Full-Stack Digital Solutions' },
        ar: { type: String, default: 'حلول الويب المتكاملة' },
        fr: { type: String, default: 'Solutions Web & Digitales' },
      },
      status: {
        en: { type: String, default: 'Active Studio' },
        ar: { type: String, default: 'خدمات معتمدة' },
        fr: { type: String, default: 'Studio Actif' },
      },
      description: {
        en: {
          type: String,
          default:
            'End-to-end design and engineering: from responsive UI architectures to robust backend REST APIs and secure database modeling.',
        },
        ar: {
          type: String,
          default:
            'تطوير تقني متكامل وشامل: من تصميم واجهات المستخدم التفاعلية إلى برمجة الخوادم وقواعد البيانات المحمية.',
        },
        fr: {
          type: String,
          default:
            'Ingénierie web de bout en bout : de la conception d’interfaces réactives au développement d’APIs REST sécurisées et bases de données optimisées.',
        },
      },
      highlights: [
        {
          en: { type: String, default: '' },
          ar: { type: String, default: '' },
          fr: { type: String, default: '' },
        },
      ],
    },
  },
  { timestamps: true }
);

export const Profile = mongoose.model('Profile', profileSchema);
