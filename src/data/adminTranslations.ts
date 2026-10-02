import { Language } from '../types';

export interface AdminTranslationDictionary {
  sidebar: {
    brandSubtitle: string;
    overview: string;
    projects: string;
    skills: string;
    profile: string;
    messages: string;
    settings: string;
    viewSite: string;
    logout: string;
  };
  login: {
    title: string;
    subtitle: string;
    identifierLabel: string;
    passwordLabel: string;
    submitBtn: string;
    checking: string;
    backToSite: string;
    defaultHint: string;
  };
  overview: {
    title: string;
    subtitle: string;
    newProject: string;
    newSkill: string;
    totalProjects: string;
    flagshipProjects: string;
    totalSkills: string;
    visitorMessages: string;
    unreadMessages: string;
    serverStatus: string;
    serverOnline: string;
    serverDesc: string;
    recentMessages: string;
    viewAll: string;
    recentProjects: string;
    noMessages: string;
    noProjects: string;
    readBtn: string;
    newBadge: string;
  };
  projects: {
    title: string;
    subtitle: string;
    addBtn: string;
    searchPlaceholder: string;
    all: string;
    edit: string;
    delete: string;
    confirmDelete: string;
    modalAddTitle: string;
    modalEditTitle: string;
    titleAr: string;
    titleEn: string;
    category: string;
    order: string;
    flagship: string;
    subtitleAr: string;
    subtitleEn: string;
    techStack: string;
    imageLabel: string;
    uploadFromDevice: string;
    uploading: string;
    preview: string;
    liveUrl: string;
    githubUrl: string;
    cancel: string;
    save: string;
    saving: string;
    successAdd: string;
    successUpdate: string;
    successDelete: string;
    uploadSuccess: string;
    noProjectsFound: string;
  };
  skills: {
    title: string;
    subtitle: string;
    addBtn: string;
    all: string;
    edit: string;
    delete: string;
    confirmDelete: string;
    modalAddTitle: string;
    modalEditTitle: string;
    skillName: string;
    category: string;
    level: string;
    highlight: string;
    contextAr: string;
    contextEn: string;
    cancel: string;
    save: string;
    saving: string;
    successAdd: string;
    successUpdate: string;
    successDelete: string;
    noSkillsFound: string;
  };
  profile: {
    title: string;
    subtitle: string;
    basicInfo: string;
    fullName: string;
    email: string;
    phone: string;
    location: string;
    mediaSection: string;
    avatarTitle: string;
    avatarDesc: string;
    cvTitle: string;
    cvDesc: string;
    uploadAvatar: string;
    uploadCv: string;
    previewCv: string;
    noCv: string;
    rolesSection: string;
    roleAr: string;
    roleEn: string;
    roleFr: string;
    bioAr: string;
    bioEn: string;
    socialSection: string;
    saveChanges: string;
    saving: string;
    successSave: string;
  };
  messages: {
    title: string;
    unreadCount: string;
    searchPlaceholder: string;
    all: string;
    unread: string;
    read: string;
    newBadge: string;
    replyEmail: string;
    delete: string;
    close: string;
    subject: string;
    noMessagesFound: string;
    confirmDelete: string;
    successDelete: string;
  };
  settings: {
    title: string;
    subtitle: string;
    cardTitle: string;
    cardDesc: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    updateBtn: string;
    updating: string;
    success: string;
    errMatch: string;
    errLength: string;
  };
}

export const adminTranslations: Record<Language, AdminTranslationDictionary> = {
  fr: {
    sidebar: {
      brandSubtitle: 'Portail CMS Admin',
      overview: "Vue d'ensemble",
      projects: 'Gestion des Projets',
      skills: 'Gestion des Compétences',
      profile: 'Profil & Paramètres',
      messages: 'Boîte de Réception',
      settings: 'Sécurité & Mot de passe',
      viewSite: 'Voir le site public',
      logout: 'Déconnexion',
    },
    login: {
      title: 'Connexion Administrateur',
      subtitle: 'Entrez vos identifiants pour accéder à la gestion du portfolio',
      identifierLabel: "Nom d'utilisateur ou Email",
      passwordLabel: 'Mot de passe',
      submitBtn: 'Se connecter',
      checking: 'Vérification...',
      backToSite: 'Retour au site',
      defaultHint: 'Compte par défaut :',
    },
    overview: {
      title: "Tableau de Bord & Métriques",
      subtitle: 'Gérez en temps réel tous les contenus de votre portfolio sans coder',
      newProject: 'Nouveau Projet',
      newSkill: 'Nouvelle Compétence',
      totalProjects: 'Total Projets',
      flagshipProjects: 'projets phares (Flagship)',
      totalSkills: 'Compétences Techniques',
      visitorMessages: 'Messages Reçus',
      unreadMessages: 'non lus',
      serverStatus: 'Statut Serveur & Base',
      serverOnline: 'En ligne 🟢',
      serverDesc: 'MongoDB connecté & opérationnel',
      recentMessages: 'Derniers Messages Reçus',
      viewAll: 'Voir tout',
      recentProjects: 'Projets du Portfolio',
      noMessages: 'Aucun message reçu pour le moment',
      noProjects: 'Aucun projet ajouté pour le moment',
      readBtn: 'Lire',
      newBadge: 'Nouveau',
    },
    projects: {
      title: 'Gestion des Projets',
      subtitle: 'Ajoutez des projets, modifiez les détails, téléversez des captures et réorganisez',
      addBtn: 'Ajouter un Projet',
      searchPlaceholder: 'Rechercher par titre ou catégorie...',
      all: 'Tous',
      edit: 'Modifier',
      delete: 'Supprimer',
      confirmDelete: 'Êtes-vous sûr de vouloir supprimer définitivement le projet',
      modalAddTitle: 'Ajouter un nouveau projet',
      modalEditTitle: 'Modifier le projet',
      titleAr: 'Titre du projet (Arabe) *',
      titleEn: 'Titre du projet (Anglais) *',
      category: 'Catégorie',
      order: "Ordre d'affichage",
      flagship: 'Projet Phare (Flagship)',
      subtitleAr: 'Résumé court (Arabe)',
      subtitleEn: 'Résumé court (Anglais)',
      techStack: 'Technologies utilisées (séparées par une virgule)',
      imageLabel: 'Capture / Image du projet',
      uploadFromDevice: "Téléverser depuis l'ordinateur",
      uploading: 'Téléversement en cours...',
      preview: 'Aperçu :',
      liveUrl: 'Lien Démo en direct (Live URL)',
      githubUrl: 'Lien GitHub Code (Dépôt)',
      cancel: 'Annuler',
      save: 'Enregistrer le Projet',
      saving: 'Enregistrement...',
      successAdd: 'Projet créé avec succès !',
      successUpdate: 'Projet mis à jour avec succès !',
      successDelete: 'Projet supprimé avec succès.',
      uploadSuccess: 'Image téléversée avec succès !',
      noProjectsFound: 'Aucun projet ne correspond à votre recherche',
    },
    skills: {
      title: 'Gestion des Compétences',
      subtitle: 'Gérez et classez vos compétences techniques entre Frontend, Backend, Database et Outils',
      addBtn: 'Ajouter une Compétence',
      all: 'Toutes',
      edit: 'Modifier',
      delete: 'Supprimer',
      confirmDelete: 'Êtes-vous sûr de vouloir supprimer la compétence',
      modalAddTitle: 'Ajouter une compétence',
      modalEditTitle: 'Modifier la compétence',
      skillName: 'Nom de la compétence *',
      category: 'Catégorie',
      level: 'Niveau (Core / Tooling / Advanced)',
      highlight: 'Mettre en avant comme compétence clé',
      contextAr: 'Description / Utilisation (Arabe)',
      contextEn: 'Description / Utilisation (Anglais)',
      cancel: 'Annuler',
      save: 'Enregistrer la compétence',
      saving: 'Enregistrement...',
      successAdd: 'Compétence ajoutée avec succès !',
      successUpdate: 'Compétence mise à jour avec succès !',
      successDelete: 'Compétence supprimée.',
      noSkillsFound: 'Aucune compétence dans cette catégorie',
    },
    profile: {
      title: 'Paramètres du Profil',
      subtitle: 'Modifiez votre nom, vos intitulés multilingues, bio, liens et téléversez votre CV',
      basicInfo: 'Informations Générales',
      fullName: 'Nom Complet *',
      email: 'Email de Contact',
      phone: 'Numéro de Téléphone',
      location: 'Localisation / Ville',
      mediaSection: 'Photo de Profil & CV PDF',
      avatarTitle: 'Photo Personnelle (Avatar)',
      avatarDesc: 'Donne une touche humaine et professionnelle à votre portfolio',
      cvTitle: 'Curriculum Vitae (CV PDF)',
      cvDesc: 'Permet aux visiteurs de télécharger votre CV en 1 clic',
      uploadAvatar: 'Nouvelle Photo',
      uploadCv: 'Téléverser CV (PDF)',
      previewCv: 'Voir le CV actuel',
      noCv: 'Aucun CV téléversé pour le moment',
      rolesSection: 'Intitulés de Poste & Bio (Multilingue)',
      roleAr: 'Intitulé (Arabe)',
      roleEn: 'Intitulé (Anglais)',
      roleFr: 'Intitulé (Français)',
      bioAr: 'Bio / Présentation (Arabe)',
      bioEn: 'Bio / Présentation (Anglais)',
      socialSection: 'Réseaux Sociaux & Liens',
      saveChanges: 'Enregistrer les Modifications',
      saving: 'Enregistrement...',
      successSave: 'Profil et paramètres mis à jour avec succès !',
    },
    messages: {
      title: 'Boîte de Réception',
      unreadCount: 'non lus',
      searchPlaceholder: 'Rechercher par nom, email ou contenu...',
      all: 'Tous',
      unread: 'Non lus',
      read: 'Lus',
      newBadge: 'Nouveau',
      replyEmail: 'Répondre par Email',
      delete: 'Supprimer',
      close: 'Fermer',
      subject: 'Objet :',
      noMessagesFound: 'Aucun message dans cette boîte',
      confirmDelete: 'Voulez-vous supprimer définitivement ce message ?',
      successDelete: 'Message supprimé avec succès.',
    },
    settings: {
      title: 'Sécurité & Mot de Passe',
      subtitle: 'Modifiez le mot de passe de votre compte administrateur',
      cardTitle: 'Mise à jour du mot de passe',
      cardDesc: 'Le nouveau mot de passe prendra effet immédiatement',
      currentPassword: 'Mot de passe actuel *',
      newPassword: 'Nouveau mot de passe *',
      confirmPassword: 'Confirmer le nouveau mot de passe *',
      updateBtn: 'Mettre à jour le mot de passe',
      updating: 'Mise à jour...',
      success: 'Mot de passe changé avec succès !',
      errMatch: 'Les nouveaux mots de passe ne correspondent pas',
      errLength: 'Le mot de passe doit comporter au moins 6 caractères',
    },
  },

  en: {
    sidebar: {
      brandSubtitle: 'Admin CMS Portal',
      overview: 'Overview',
      projects: 'Projects Manager',
      skills: 'Skills Manager',
      profile: 'Profile & Settings',
      messages: 'Inbox Messages',
      settings: 'Security & Password',
      viewSite: 'View Public Site',
      logout: 'Logout',
    },
    login: {
      title: 'Admin Portal Login',
      subtitle: 'Enter your credentials to access the portfolio content management system',
      identifierLabel: 'Username or Email',
      passwordLabel: 'Password',
      submitBtn: 'Sign In',
      checking: 'Signing In...',
      backToSite: 'Back to site',
      defaultHint: 'Default account:',
    },
    overview: {
      title: 'Dashboard & Metrics',
      subtitle: 'Manage all portfolio content, projects, skills and messages in real-time',
      newProject: 'New Project',
      newSkill: 'New Skill',
      totalProjects: 'Total Projects',
      flagshipProjects: 'flagship projects',
      totalSkills: 'Technical Skills',
      visitorMessages: 'Visitor Messages',
      unreadMessages: 'unread',
      serverStatus: 'Server & DB Status',
      serverOnline: 'Online 🟢',
      serverDesc: 'MongoDB connected & ready',
      recentMessages: 'Recent Messages',
      viewAll: 'View all',
      recentProjects: 'Portfolio Projects',
      noMessages: 'No messages received yet',
      noProjects: 'No projects added yet',
      readBtn: 'Read',
      newBadge: 'New',
    },
    projects: {
      title: 'Projects Manager',
      subtitle: 'Add new projects, edit details, upload screenshots and reorder',
      addBtn: 'Add New Project',
      searchPlaceholder: 'Search by title or category...',
      all: 'All',
      edit: 'Edit',
      delete: 'Delete',
      confirmDelete: 'Are you sure you want to delete the project',
      modalAddTitle: 'Add New Project',
      modalEditTitle: 'Edit Project Details',
      titleAr: 'Project Title (Arabic) *',
      titleEn: 'Project Title (English) *',
      category: 'Category',
      order: 'Display Order',
      flagship: 'Featured Project (Flagship)',
      subtitleAr: 'Short Summary (Arabic)',
      subtitleEn: 'Short Summary (English)',
      techStack: 'Tech Stack (comma-separated)',
      imageLabel: 'Project Screenshot / Image',
      uploadFromDevice: 'Upload from device',
      uploading: 'Uploading...',
      preview: 'Preview:',
      liveUrl: 'Live Demo URL',
      githubUrl: 'GitHub Code URL',
      cancel: 'Cancel',
      save: 'Save Project',
      saving: 'Saving...',
      successAdd: 'Project created successfully!',
      successUpdate: 'Project updated successfully!',
      successDelete: 'Project deleted successfully.',
      uploadSuccess: 'Image uploaded successfully!',
      noProjectsFound: 'No projects match your search',
    },
    skills: {
      title: 'Skills Manager',
      subtitle: 'Organize technical skills across Frontend, Backend, Database and Tools',
      addBtn: 'Add New Skill',
      all: 'All',
      edit: 'Edit',
      delete: 'Delete',
      confirmDelete: 'Are you sure you want to delete the skill',
      modalAddTitle: 'Add New Skill',
      modalEditTitle: 'Edit Skill',
      skillName: 'Skill Name *',
      category: 'Category',
      level: 'Level (Core / Tooling / Advanced)',
      highlight: 'Highlight as Core Skill',
      contextAr: 'Description / Usage (Arabic)',
      contextEn: 'Description / Usage (English)',
      cancel: 'Cancel',
      save: 'Save Skill',
      saving: 'Saving...',
      successAdd: 'Skill added successfully!',
      successUpdate: 'Skill updated successfully!',
      successDelete: 'Skill deleted.',
      noSkillsFound: 'No skills in this category',
    },
    profile: {
      title: 'Profile Settings',
      subtitle: 'Edit your name, multilingual roles, bio, social links, and upload CV/avatar',
      basicInfo: 'General Information',
      fullName: 'Full Name *',
      email: 'Contact Email',
      phone: 'Phone Number',
      location: 'Location / Country',
      mediaSection: 'Profile Photo & CV PDF',
      avatarTitle: 'Profile Photo (Avatar)',
      avatarDesc: 'Adds a personal and professional touch to your portfolio',
      cvTitle: 'Resume (CV PDF)',
      cvDesc: 'Allows visitors to download your resume in one click',
      uploadAvatar: 'New Photo',
      uploadCv: 'Upload CV (PDF)',
      previewCv: 'View Current CV',
      noCv: 'No CV uploaded yet',
      rolesSection: 'Job Roles & Bio (Multilingual)',
      roleAr: 'Role Title (Arabic)',
      roleEn: 'Role Title (English)',
      roleFr: 'Role Title (French)',
      bioAr: 'Bio (Arabic)',
      bioEn: 'Bio (English)',
      socialSection: 'Social Media Links',
      saveChanges: 'Save Changes',
      saving: 'Saving...',
      successSave: 'Profile settings updated successfully!',
    },
    messages: {
      title: 'Messages Inbox',
      unreadCount: 'unread',
      searchPlaceholder: 'Search messages, email or content...',
      all: 'All',
      unread: 'Unread',
      read: 'Read',
      newBadge: 'New',
      replyEmail: 'Reply via Email',
      delete: 'Delete',
      close: 'Close',
      subject: 'Subject:',
      noMessagesFound: 'No messages in this folder',
      confirmDelete: 'Are you sure you want to delete this message?',
      successDelete: 'Message deleted successfully.',
    },
    settings: {
      title: 'Security & Password',
      subtitle: 'Update your administrator account password',
      cardTitle: 'Update Admin Password',
      cardDesc: 'Your new password will take effect immediately upon saving',
      currentPassword: 'Current Password *',
      newPassword: 'New Password *',
      confirmPassword: 'Confirm New Password *',
      updateBtn: 'Update Password',
      updating: 'Updating...',
      success: 'Password updated successfully!',
      errMatch: 'New passwords do not match',
      errLength: 'New password must be at least 6 characters',
    },
  },

  ar: {
    sidebar: {
      brandSubtitle: 'لوحة تحكم المشرف',
      overview: 'لوحة المؤشرات (Overview)',
      projects: 'إدارة المشاريع (Projects)',
      skills: 'إدارة المهارات (Skills)',
      profile: 'المعلومات الشخصية (Profile)',
      messages: 'صندوق الرسائل (Inbox)',
      settings: 'الأمان وكلمة المرور',
      viewSite: 'معاينة الموقع المباشر',
      logout: 'تسجيل الخروج',
    },
    login: {
      title: 'لوحة تحكم المشرف',
      subtitle: 'أدخل بيانات الاعتماد الخاصة بك للوصول إلى إدارة المحتوى',
      identifierLabel: 'اسم المستخدم أو البريد الإلكتروني',
      passwordLabel: 'كلمة المرور',
      submitBtn: 'تسجيل الدخول',
      checking: 'جارٍ التحقق...',
      backToSite: 'العودة للموقع',
      defaultHint: 'الحساب الافتراضي:',
    },
    overview: {
      title: 'لوحة المؤشرات والتحكم',
      subtitle: 'إدارة كافة محتويات البورتفوليو، المشاريع، المهارات، والرسائل الواردة فورياً',
      newProject: 'مشروع جديد',
      newSkill: 'مهارة جديدة',
      totalProjects: 'إجمالي المشاريع',
      flagshipProjects: 'مشاريع رئيسية (Flagship)',
      totalSkills: 'المهارات التقنية',
      visitorMessages: 'رسائل الزوار',
      unreadMessages: 'غير مقروءة',
      serverStatus: 'حالة الخادم وقاعدة البيانات',
      serverOnline: 'Online 🟢',
      serverDesc: 'MongoDB متصل وجاهز',
      recentMessages: 'أحدث الرسائل الواردة',
      viewAll: 'عرض الكل',
      recentProjects: 'المشاريع في الموقع',
      noMessages: 'لا توجد رسائل واردة حتى الآن',
      noProjects: 'لا توجد مشاريع مضافة حتى الآن',
      readBtn: 'قراءة',
      newBadge: 'جديدة',
    },
    projects: {
      title: 'إدارة المشاريع (Projects Manager)',
      subtitle: 'إضافة مشاريع جديدة، تعديل التفاصيل، رفع الصور، وتغيير الترتيب',
      addBtn: 'إضافة مشروع جديد',
      searchPlaceholder: 'بحث بالاسم أو التصنيف...',
      all: 'الكل',
      edit: 'تعديل',
      delete: 'حذف',
      confirmDelete: 'هل أنت متأكد من رغبتك في حذف المشروع',
      modalAddTitle: 'إضافة مشروع جديد',
      modalEditTitle: 'تعديل بيانات المشروع',
      titleAr: 'عنوان المشروع (بالعربية) *',
      titleEn: 'عنوان المشروع (بالإنجليزية) *',
      category: 'التصنيف',
      order: 'الترتيب في العرض',
      flagship: 'مشروع مميز (Flagship)',
      subtitleAr: 'نبذة مختصرة (بالعربية)',
      subtitleEn: 'نبذة مختصرة (بالإنجليزية)',
      techStack: 'التقنيات المستخدمة (مفصولة بفاصلة)',
      imageLabel: 'صورة المشروع',
      uploadFromDevice: 'رفع صورة من جهازك',
      uploading: 'جارٍ الرفع...',
      preview: 'معاينة:',
      liveUrl: 'رابط المعاينة الحية (Live Demo URL)',
      githubUrl: 'رابط المستودع (GitHub Code URL)',
      cancel: 'إلغاء',
      save: 'حفظ المشروع',
      saving: 'جارٍ الحفظ...',
      successAdd: 'تم إنشاء المشروع بنجاح!',
      successUpdate: 'تم تحديث المشروع بنجاح!',
      successDelete: 'تم حذف المشروع بنجاح.',
      uploadSuccess: 'تم رفع الصورة بنجاح!',
      noProjectsFound: 'لا توجد مشاريع تطابق البحث',
    },
    skills: {
      title: 'إدارة المهارات التقنية (Skills Manager)',
      subtitle: 'إضافة مهارات وتقنيات جديدة وتصنيفها بين Frontend و Backend و Database و Tools',
      addBtn: 'إضافة مهارة جديدة',
      all: 'الكل',
      edit: 'تعديل',
      delete: 'حذف',
      confirmDelete: 'هل أنت متأكد من حذف المهارة',
      modalAddTitle: 'إضافة مهارة جديدة',
      modalEditTitle: 'تعديل المهارة',
      skillName: 'اسم المهارة *',
      category: 'التصنيف',
      level: 'المستوى (Core / Tooling / Advanced)',
      highlight: 'تمييز كمهارة رئيسية (Highlight)',
      contextAr: 'شرح ونبذة عن المهارة (بالعربية)',
      contextEn: 'شرح ونبذة عن المهارة (بالإنجليزية)',
      cancel: 'إلغاء',
      save: 'حفظ المهارة',
      saving: 'جارٍ الحفظ...',
      successAdd: 'تم إضافة المهارة بنجاح!',
      successUpdate: 'تم تحديث المهارة بنجاح!',
      successDelete: 'تم حذف المهارة بنجاح.',
      noSkillsFound: 'لا توجد مهارات في هذا التصنيف',
    },
    profile: {
      title: 'إعدادات الملف الشخصي (Profile Settings)',
      subtitle: 'تعديل الاسم، المسميات الوظيفية بجميع اللغات، النبذة، روابط التواصل ورفع السيرة الذاتية والصورة',
      basicInfo: 'المعلومات الأساسية',
      fullName: 'الاسم الكامل *',
      email: 'البريد الإلكتروني للاتصال',
      phone: 'رقم الهاتف (اختياري)',
      location: 'الموقع الجغرافي / الدولة',
      mediaSection: 'الصورة الشخصية والسيرة الذاتية (CV)',
      avatarTitle: 'الصورة الشخصية (Avatar)',
      avatarDesc: 'تظهر في النبذة والفوتر وتمنح البورتفوليو مظهراً احترافياً',
      cvTitle: 'ملف السيرة الذاتية (Resume PDF)',
      cvDesc: 'يتيح لزوار الموقع تحميل السيرة الذاتية مباشرة بنقرة زر',
      uploadAvatar: 'رفع صورة جديدة',
      uploadCv: 'رفع ملف PDF',
      previewCv: 'معاينة الـ CV الحالي',
      noCv: 'لم يتم رفع سيرة ذاتية بعد',
      rolesSection: 'المسميات الوظيفية والنبذة (متعدد اللغات)',
      roleAr: 'المسمى (عربي)',
      roleEn: 'Role (English)',
      roleFr: 'Rôle (Français)',
      bioAr: 'النبذة التعريفية (عربي)',
      bioEn: 'About Bio (English)',
      socialSection: 'روابط التواصل الاجتماعي (Social Links)',
      saveChanges: 'حفظ البيانات الشخصية',
      saving: 'جارٍ حفظ التغييرات...',
      successSave: 'تم حفظ وتحديث بيانات الملف الشخصي بنجاح!',
    },
    messages: {
      title: 'صندوق الرسائل (Messages Inbox)',
      unreadCount: 'غير مقروءة',
      searchPlaceholder: 'بحث في الرسائل والبريد...',
      all: 'الكل',
      unread: 'غير مقروءة',
      read: 'المقروءة',
      newBadge: 'جديدة',
      replyEmail: 'الرد عبر البريد',
      delete: 'حذف',
      close: 'إغلاق',
      subject: 'الموضوع:',
      noMessagesFound: 'لا توجد رسائل واردة في هذا التصنيف',
      confirmDelete: 'هل أنت متأكد من حذف هذه الرسالة نهائياً؟',
      successDelete: 'تم حذف الرسالة بنجاح.',
    },
    settings: {
      title: 'إعدادات الأمان وكلمة المرور',
      subtitle: 'تغيير كلمة المرور الخاصة بحساب المشرف لحماية لوحة التحكم',
      cardTitle: 'تحديث كلمة مرور المشرف',
      cardDesc: 'ستسري كلمة المرور الجديدة فور حفظها',
      currentPassword: 'كلمة المرور الحالية *',
      newPassword: 'كلمة المرور الجديدة *',
      confirmPassword: 'تأكيد كلمة المرور الجديدة *',
      updateBtn: 'تحديث كلمة المرور',
      updating: 'جارٍ التحديث...',
      success: 'تم تغيير كلمة المرور بنجاح! احرص على حفظها جيداً.',
      errMatch: 'كلمة المرور الجديدة وتأكيدها غير متطابقين',
      errLength: 'كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل',
    },
  },
};
