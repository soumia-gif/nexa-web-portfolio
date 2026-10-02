import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'tsla-ecom',
    flagship: true,
    coverGradient: 'from-pink-900/50 via-purple-950/40 to-rose-950/40',
    category: 'Full-Stack',
    badge: 'Full-Stack / E-commerce',
    image: '/projects/tsla-ecom.jpg',
    title: {
      en: 'TSLA Ecom',
      fr: 'TSLA Ecom',
      ar: 'TSLA Ecom'
    },
    subtitle: {
      en: 'E-commerce web platform featuring product filtering, multi-language support (Arabic/French), light/dark themes, order tracking, and administrative controls.',
      fr: 'Plateforme web e-commerce avec filtrage de produits, support multilingue (Arabe/Français), thèmes clair/sombre, suivi des commandes et panneau d\'administration.',
      ar: 'منصة تجارة إلكترونية تدعم تصفية المنتجات، دعم اللغتين (العربية/الفرنسية)، المظهرين الفاتح والداكن، تتبع الطلبات ولوحة إدارة شاملة.'
    },
    summary: {
      en: 'A modern full-stack e-commerce web platform featuring dynamic product filtering, bilingual Arabic/French localization, seamless light/dark mode toggling, order status tracking, and robust administrative inventory and product controls.',
      fr: 'Une plateforme e-commerce full-stack moderne et dynamique avec recherche et filtres avancés, support bilingue arabe/français, thèmes personnalisables, suivi de commandes en direct et panneau de contrôle administrateur.',
      ar: 'منصة تجارة إلكترونية متكاملة تتيح تجربة تسوق سلسة مع تصفية المنتجات المتقدمة، الدعم ثنائي اللغة، المظهر الداكن والفاتح، تتبع الشحنات وإدارة المنتجات.'
    },
    metrics: [
      { label: 'Catalogue', value: 'Filtres & Recherche' },
      { label: 'Langues', value: 'Arabe & Français' },
      { label: 'Commandes', value: 'Suivi en direct' }
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    caseStudy: {
      overview: 'TSLA Ecom est une plateforme e-commerce moderne conçue de bout en bout pour offrir une expérience d\'achat fluide et performante, avec des filtres instantanés, un panier persistant et une interface adaptée à toutes les langues.',
      theProblem: 'Permettre aux acheteurs de naviguer dans un vaste catalogue avec filtres multicritères sans ralentissement, tout en offrant une interface bilingue (arabe et français) et un suivi de commande clair.',
      architecturalSolution: 'Développement d’une architecture MERN associée à Tailwind CSS, avec gestion de l’état du panier et des préférences utilisateur en React Context, et API REST Express connectée à MongoDB.',
      architectureHighlights: [
        {
          title: 'Filtrage Dynamique des Produits',
          description: 'Recherche instantanée et filtres par catégories, prix, avis clients et tags sans rechargement.',
          badge: 'Filtres Instantanés'
        },
        {
          title: 'Support Multilingue & Thèmes',
          description: 'Navigation bilingue Arabe (RTL) / Français (LTR) avec bascule instantanée entre mode sombre et clair.',
          badge: 'i18n & Dark/Light'
        },
        {
          title: 'Suivi des Commandes',
          description: 'Interface de suivi en temps réel de l’état d’avancement des commandes et historique d’achats.',
          badge: 'Order Tracking'
        },
        {
          title: 'Contrôles d\'Administration',
          description: 'Espace sécurisé pour la gestion du catalogue (ajout, mise à jour des prix, stock et suppression).',
          badge: 'Admin Portal'
        }
      ],
      stackBreakdown: [
        {
          category: 'Frontend',
          technologies: ['React.js', 'Tailwind CSS', 'Context API', 'Lucide React Icons', 'Responsive & RTL Design']
        },
        {
          category: 'Backend & API',
          technologies: ['Node.js', 'Express.js', 'API REST', 'Routage sécurisé']
        },
        {
          category: 'Base de données',
          technologies: ['MongoDB', 'Mongoose (Schémas Produits, Utilisateurs & Commandes)']
        },
        {
          category: 'Outils',
          technologies: ['Git', 'GitHub', 'Vite', 'Postman']
        }
      ],
      schemaAndSecurity: 'Modèles Mongoose avec indexation sur les champs de recherche. Validation des schémas de commandes et hachage sécurisé des données sensibles.',
      keyChallenges: [
        {
          challenge: 'Gérer la réactivité des filtres et la synchronisation du panier en temps réel.',
          resolution: 'Utilisation de React Hooks et Context avec debounce sur les filtres pour un rendu instantané.'
        },
        {
          challenge: 'Assurer une adaptation parfaite entre arabe (RTL) et français (LTR) avec les thèmes sombre et clair.',
          resolution: 'Application de styles CSS logiques et variables Tailwind pour basculer dynamiquement le sens de lecture et la palette de couleurs.'
        }
      ],
      measurableImpact: [
        { label: 'Temps de réponse', value: '< 100ms', change: 'Instantané' },
        { label: 'Support i18n', value: 'Arabe / FR', change: 'Complet' }
      ],
      githubUrl: 'https://github.com/nexaweb/tsla-ecom',
      liveUrl: 'https://tsla-ecom.vercel.app'
    }
  },

  {
    id: 'tsla-restaurant',
    flagship: true,
    coverGradient: 'from-rose-900/50 via-purple-950/40 to-[#12051a]',
    category: 'Full-Stack',
    badge: 'Full-Stack / Web App',
    image: '/projects/tsla-restaurant.jpg',
    title: {
      en: 'TSLA Restaurant',
      fr: 'TSLA Restaurant',
      ar: 'TSLA Restaurant'
    },
    subtitle: {
      en: 'Restaurant management web application featuring online ordering, meal customization, direct WhatsApp ordering, VIP table reservations, and an admin dashboard.',
      fr: 'Application web de gestion de restaurant avec commande en ligne, personnalisation des plats, commande directe via WhatsApp, réservation de tables VIP et tableau de bord administrateur.',
      ar: 'تطبيق ويب متكامل لإدارة المطاعم: الطلب عبر الإنترنت، تخصيص الوجبات، الطلب المباشر عبر واتساب، حجز طاولات VIP ولوحة تحكم للإدارة.'
    },
    summary: {
      en: 'A high-end restaurant management web app enabling customers to customize gourmet dishes, submit orders through WhatsApp or online checkout, book VIP tables, and offering restaurateurs a centralized admin dashboard.',
      fr: 'Une solution complète de commande et de gestion de restaurant permettant aux clients de personnaliser leurs plats, de commander en un clic via WhatsApp ou en ligne, de réserver des tables VIP et aux gérants de piloter leur activité via un tableau de bord dédié.',
      ar: 'تطبيق ويب رقمي للمطاعم يوفر تجربة فريدة لطلب الطعام مع خيارات التخصيص الكاملة، إرسال الطلب المباشر عبر واتساب، حجز طاولات VIP، ولوحة تحكم متطورة للمديرين.'
    },
    metrics: [
      { label: 'Commandes', value: 'WhatsApp & En Ligne' },
      { label: 'Tables', value: 'Réservations VIP' },
      { label: 'Pilotage', value: 'Dashboard Admin' }
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    caseStudy: {
      overview: 'TSLA Restaurant est une application web full-stack développée pour digitaliser les opérations de restauration : carte dynamique, personnalisation des plats, commandes instantanées via WhatsApp et réservations de tables VIP.',
      theProblem: 'Réduire le temps de prise de commande, éliminer les erreurs sur les préférences des clients (sauces, cuisson, suppléments) et automatiser la gestion des réservations de tables VIP.',
      architecturalSolution: 'Application React connectée à une API Express/Node.js et base de données MongoDB, intégrant la génération dynamique de messages WhatsApp structurés et un module de réservation en temps réel.',
      architectureHighlights: [
        {
          title: 'Commande en Ligne & WhatsApp Direct',
          description: 'Panier interactif avec bouton direct générant automatiquement un message préformaté avec le détail des plats pour WhatsApp.',
          badge: 'WhatsApp Click-to-Order'
        },
        {
          title: 'Personnalisation des Plats',
          description: 'Options sur mesure pour chaque met : choix des sauces, niveau de piment, accompagnements et demandes spéciales.',
          badge: 'Meal Customization'
        },
        {
          title: 'Réservation de Tables VIP',
          description: 'Module de réservation avec choix de date, créneau horaire, nombre de convives et demandes exclusives.',
          badge: 'VIP Reservations'
        },
        {
          title: 'Dashboard Administrateur',
          description: 'Gestion centralisée des plats du menu, suivi des commandes reçues et validation des tables réservées.',
          badge: 'Admin Dashboard'
        }
      ],
      stackBreakdown: [
        {
          category: 'Frontend',
          technologies: ['React.js', 'Tailwind CSS', 'Lucide React', 'Gestion des formulaires & état global']
        },
        {
          category: 'Backend & API',
          technologies: ['Node.js', 'Express.js', 'API REST', 'Contrôleurs de commandes & réservations']
        },
        {
          category: 'Base de données',
          technologies: ['MongoDB', 'Mongoose (Schémas Plats, Menus, Commandes & Tables)']
        },
        {
          category: 'Outils',
          technologies: ['Git', 'GitHub', 'Thunder Client', 'Vite']
        }
      ],
      schemaAndSecurity: 'Validation Mongoose stricte des réservations et des commandes. Contrôle de validité des dates et créneaux pour prévenir les surréservations.',
      keyChallenges: [
        {
          challenge: 'Encoder proprement la commande complète avec personnalisation dans une URL WhatsApp lisible et claire pour le restaurant.',
          resolution: 'Création d’une fonction utilitaire d’encodage URI convertissant le panier et ses options en message Markdown WhatsApp parfaitement aéré.'
        },
        {
          challenge: 'Garantir la disponibilité en temps réel des tables VIP sans conflits de dates.',
          resolution: 'Mise en place d’un contrôle d’unicité et de créneau horaire côté serveur avant validation de chaque réservation.'
        }
      ],
      measurableImpact: [
        { label: 'Prise de commande', value: 'WhatsApp 1-Clic', change: 'Direct' },
        { label: 'Gestion tables', value: '100% Automatisée', change: 'Zéro conflit' }
      ],
      githubUrl: 'https://github.com/nexaweb/tsla-restaurant',
      liveUrl: 'https://tsla-restaurant.vercel.app'
    }
  },

  {
    id: 'adrenaline-salle',
    flagship: true,
    coverGradient: 'from-pink-900/40 via-purple-950/40 to-rose-950/40',
    category: 'Full-Stack',
    image: '/projects/adrenaline-home.png',
    title: {
      en: 'Adrenaline Salle',
      fr: 'Adrenaline Salle',
      ar: 'أدرينالين صال (Adrenaline Salle)'
    },
    subtitle: {
      en: 'Gym management web application for managing activities, coaches, sessions, bookings, subscriptions and payments.',
      fr: 'Application web de gestion d\'une salle de sport pour gérer les activités, coachs, séances, réservations, abonnements et paiements.',
      ar: 'تطبيق ويب لإدارة قاعة رياضية: الأنشطة، المدربين، الحصص، الحجوزات، الاشتراكات والمدفوعات.'
    },
    summary: {
      en: 'A comprehensive full-stack management solution for fitness centers, centralizing member bookings, coach planning, subscription tiers, and payment records into an intuitive dashboard.',
      fr: 'Solution complète de gestion pour salle de sport, centralisant le suivi des adhérents, le planning des coachs, les réservations de séances, les formules d\'abonnement et l\'historique des paiements.',
      ar: 'حل رقمي شامل لإدارة المراكز الرياضية، يجمع بين إدارة اشتراكات الأعضاء، جداول المدربين، حجز الحصص وتتبع المدفوعات في لوحة تحكم واحدة.'
    },
    metrics: [
      { label: 'Gestion', value: '100% Modulaire' },
      { label: 'Suivi', value: 'Séances & Coachs' },
      { label: 'Abonnements', value: 'Paiements & Plans' }
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose'],
    caseStudy: {
      overview: 'Adrenaline Salle est une application web full-stack conçue pour simplifier le quotidien des gestionnaires de salle de sport et de leurs membres, en automatisant la gestion des plannings, des adhésions et des réservations.',
      theProblem: 'La gestion manuelle ou dispersée des plannings de cours, des disponibilités des coachs et du suivi des abonnements engendre souvent des erreurs de réservation et un manque de visibilité sur les paiements.',
      architecturalSolution: 'Développement d’une architecture MERN (MongoDB, Express, React, Node.js) avec des modèles Mongoose structurés pour les coachs, séances et abonnements, reliée à une interface React fluide.',
      architectureHighlights: [
        {
          title: 'Gestion des Séances & Coachs',
          description: 'Attribution des coachs aux différentes activités sportives et gestion dynamique des créneaux horaires.',
          badge: 'Plannings'
        },
        {
          title: 'Réservations & Disponibilités',
          description: 'Système permettant aux membres de réserver leurs séances avec mise à jour des places restantes.',
          badge: 'Réservations'
        },
        {
          title: 'Abonnements & Suivi des Paiements',
          description: 'Suivi des forfaits actifs, dates d’expiration et enregistrement des statuts de paiement.',
          badge: 'Finance & Plans'
        },
        {
          title: 'Interface Réactive',
          description: 'Navigation intuitive et affichage adapté aux ordinateurs comme aux mobiles.',
          badge: 'Responsive UI'
        }
      ],
      stackBreakdown: [
        {
          category: 'Frontend',
          technologies: ['React.js', 'JavaScript (ES6+)', 'CSS / Responsive Layout', 'Composants modulaires']
        },
        {
          category: 'Backend & API',
          technologies: ['Node.js', 'Express.js', 'API REST', 'Routage & Middlewares']
        },
        {
          category: 'Base de données',
          technologies: ['MongoDB', 'Mongoose (Schémas, Relations & Validations)']
        },
        {
          category: 'Outils & Tests',
          technologies: ['Git', 'GitHub', 'Thunder Client (Tests des routes API)']
        }
      ],
      schemaAndSecurity: 'Modélisation relationnelle avec Mongoose (références entre utilisateurs, séances et abonnements). Validation des formulaires et contrôle des données avant enregistrement en base.',
      keyChallenges: [
        {
          challenge: 'Gérer la cohérence entre les séances programmées, la capacité maximale de la salle et les réservations effectuées.',
          resolution: 'Mise en place d’une logique de validation côté backend vérifiant le nombre de places disponibles avant de confirmer chaque réservation.'
        },
        {
          challenge: 'Assurer une navigation simple pour visualiser à la fois les activités, les coachs et le statut des abonnements.',
          resolution: 'Découpage du frontend en composants React réutilisables avec gestion de l’état local pour un affichage instantané sans rechargement de page.'
        }
      ],
      measurableImpact: [
        { label: 'Modules Intégrés', value: '6 Modules', change: 'Complet' },
        { label: 'Organisation', value: 'Automatisée', change: '+100%' }
      ],
      githubUrl: '',
      liveUrl: ''
    }
  },

  {
    id: 'mes-recettes',
    flagship: false,
    coverGradient: 'from-purple-900/40 via-pink-950/40 to-[#12051a]',
    category: 'Full-Stack',
    image: '/projects/mes-recettes.png',
    title: {
      en: 'Mes Recettes',
      fr: 'Mes Recettes',
      ar: 'وصفاتي (Mes Recettes)'
    },
    subtitle: {
      en: 'Recipe management web application for creating, searching and managing recipes.',
      fr: 'Application web de gestion de recettes pour créer, rechercher et gérer des recettes.',
      ar: 'تطبيق ويب لإدارة الوصفات لإنشاء، البحث عن وإدارة وصفات الطبخ.'
    },
    summary: {
      en: 'A user-friendly culinary web app where food lovers can explore cooking ideas, add their own custom recipes with ingredients and preparation steps, and organize their favorite meals.',
      fr: 'Une plateforme culinaire conviviale permettant aux passionnés de cuisine de publier leurs recettes, d\'effectuer des recherches par critères et d\'organiser facilement leurs préparations préférées.',
      ar: 'منصة وصفات تفاعلية تتيح لعشاق الطبخ استكشاف أفكار جديدة، إضافة وصفاتهم مع المقادير وخطوات التحضير، وإدارة قائمة وجباتهم المفضلة.'
    },
    metrics: [
      { label: 'Opérations', value: 'CRUD Complet' },
      { label: 'Recherche', value: 'Rapide & Filtrée' },
      { label: 'Base de données', value: 'MongoDB' }
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose'],
    caseStudy: {
      overview: 'Mes Recettes est une application web full-stack dédiée au partage et à l\'organisation de recettes de cuisine, offrant un catalogue clair et des fonctionnalités d\'ajout et de modification personnalisées.',
      theProblem: 'Il est souvent difficile de retrouver des recettes éparpillées sur plusieurs supports ou de noter rapidement ses propres variantes d\'ingrédients avec les bonnes instructions.',
      architecturalSolution: 'Création d’une API REST Express connectée à MongoDB via Mongoose pour stocker les détails des recettes (ingrédients, temps de préparation, étapes), consommée par une application React dynamique.',
      architectureHighlights: [
        {
          title: 'Création & Édition de Recettes',
          description: 'Formulaire ergonomique permettant d’ajouter des listes d’ingrédients, le temps de cuisson et les étapes de préparation.',
          badge: 'Gestion CRUD'
        },
        {
          title: 'Recherche & Filtres',
          description: 'Moteur de recherche par mots-clés ou catégories pour retrouver instantanément un plat.',
          badge: 'Recherche'
        },
        {
          title: 'Affichage Détaillé',
          description: 'Fiches de recettes claires et structurées avec une mise en page aérée et agréable.',
          badge: 'Design Épuré'
        }
      ],
      stackBreakdown: [
        {
          category: 'Frontend',
          technologies: ['React.js', 'JavaScript (ES6+)', 'CSS Moderne / Flexbox & Grid']
        },
        {
          category: 'Backend & API',
          technologies: ['Node.js', 'Express.js', 'Routes RESTful pour les opérations de recettes']
        },
        {
          category: 'Base de données',
          technologies: ['MongoDB', 'Mongoose (Schéma de recettes avec sous-documents pour ingrédients)']
        },
        {
          category: 'Outils',
          technologies: ['Git', 'GitHub', 'Thunder Client']
        }
      ],
      schemaAndSecurity: 'Schéma Mongoose Recipe avec validation des champs requis (titre, ingrédients, étapes). Protection contre les entrées invalides côté serveur.',
      keyChallenges: [
        {
          challenge: 'Permettre la saisie dynamique d’un nombre variable d’ingrédients et d’étapes dans le formulaire.',
          resolution: 'Utilisation de formulaires dynamiques en React avec manipulation de tableaux d’états locaux (ajout/suppression de lignes à la volée).'
        },
        {
          challenge: 'Optimiser la recherche pour trouver des recettes facilement selon différents termes.',
          resolution: 'Implémentation d’une recherche filtrée côté API et côté client pour une expérience utilisateur rapide.'
        }
      ],
      measurableImpact: [
        { label: 'Expérience', value: 'Fluide & Simple', change: 'Optimisé' },
        { label: 'Gestion Données', value: '100% Persistant', change: 'NoSQL' }
      ],
      githubUrl: '',
      liveUrl: ''
    }
  },

  {
    id: 'meteo-app',
    flagship: false,
    coverGradient: 'from-fuchsia-950/40 via-purple-950/30 to-[#0d0416]',
    category: 'Web Development',
    image: '/projects/meteo-app.png',
    title: {
      en: 'Météo',
      fr: 'Météo',
      ar: 'تطبيق الطقس (Météo)'
    },
    subtitle: {
      en: 'Weather application using an API to display weather information for different cities.',
      fr: 'Application météo utilisant une API pour afficher les informations météorologiques de différentes villes.',
      ar: 'تطبيق طقس يعتمد على واجهة برمجية (API) لعرض أحوال الطقس لمختلف المدن.'
    },
    summary: {
      en: 'An intuitive real-time weather web application providing current temperature, humidity, wind conditions, and weather forecasts for cities worldwide via third-party API integration.',
      fr: 'Une application météo réactive affichant en temps réel les températures, conditions climatiques, taux d\'humidité et prévisions d\'une ville grâce à l\'interrogation d\'une API météo.',
      ar: 'تطبيق ويب سريع ودقيق لعرض أحوال الطقس المباشرة، درجات الحرارة، الرطوبة وسرعة الرياح لمختلف المدن حول العالم عبر ربط API متخصصة.'
    },
    metrics: [
      { label: 'Données', value: 'Temps Réel' },
      { label: 'Source', value: 'API Météo' },
      { label: 'Interface', value: 'Responsive' }
    ],
    techStack: ['React', 'JavaScript', 'API'],
    caseStudy: {
      overview: 'Météo est une application web interactive conçue avec React qui interroge une API météo pour délivrer instantanément les conditions climatiques précises d’une ville recherchée.',
      theProblem: 'Les utilisateurs ont besoin d’un moyen rapide, clair et sans distraction pour connaître la météo actuelle et planifier leur journée sans interface encombrée.',
      architecturalSolution: 'Application React connectée à une API météo REST externe via des requêtes asynchrones Fetch / Axios, avec gestion dynamique des états de chargement et des messages d’erreur.',
      architectureHighlights: [
        {
          title: 'Recherche de Ville Instantanée',
          description: 'Barre de recherche ergonomique avec interrogation directe de l’API météo.',
          badge: 'Recherche Dynamique'
        },
        {
          title: 'Affichage des Données Clés',
          description: 'Température actuelle, ressenti, humidité, vitesse du vent et icônes météorologiques adaptées.',
          badge: 'Données Précises'
        },
        {
          title: 'Gestion des Erreurs & Chargement',
          description: 'Indicateurs visuels pendant la récupération des données et message clair si la ville saisie est introuvable.',
          badge: 'Expérience Utilisateur'
        }
      ],
      stackBreakdown: [
        {
          category: 'Technologies Utilisées',
          technologies: ['React.js', 'JavaScript (ES6+ / Async Await)', 'Weather REST API', 'CSS']
        },
        {
          category: 'Outils',
          technologies: ['Git', 'GitHub', 'Navigateur / DevTools']
        }
      ],
      schemaAndSecurity: 'Traitement sécurisé des clés d’API via des variables d’environnement. Validation des entrées utilisateur pour éviter les requêtes erronées.',
      keyChallenges: [
        {
          challenge: 'Gérer les requêtes asynchrones et afficher un état de chargement fluide sans blocage de l’interface.',
          resolution: 'Utilisation de hooks React (useState, useEffect) avec gestion explicite des états loading, error et data.'
        },
        {
          challenge: 'Traiter les cas où l’utilisateur recherche une ville inexistante ou mal orthographiée.',
          resolution: 'Capture des codes de retour HTTP de l’API météo (404, 500) avec affichage d’un message d’aide convivial.'
        }
      ],
      measurableImpact: [
        { label: 'Interrogation', value: 'Instantanée', change: 'Async' },
        { label: 'Précision', value: 'Temps Réel', change: 'Live' }
      ],
      githubUrl: '',
      liveUrl: ''
    }
  }
];
