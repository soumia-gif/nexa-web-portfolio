import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    label: {
      en: { type: String, default: '' },
      fr: { type: String, default: '' },
      ar: { type: String, default: '' },
    },
    enabled: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const defaultSections = [
  { id: 'hero', label: { en: 'Hero Banner', fr: 'Bannière Principale', ar: 'الواجهة الرئيسية' }, enabled: true, order: 1 },
  { id: 'about', label: { en: 'About Me', fr: 'À Propos', ar: 'من أنا' }, enabled: true, order: 2 },
  { id: 'projects', label: { en: 'Projects', fr: 'Projets', ar: 'المشاريع' }, enabled: true, order: 3 },
  { id: 'skills', label: { en: 'Skills & Tech', fr: 'Compétences & Tech', ar: 'المهارات والتقنيات' }, enabled: true, order: 4 },
  { id: 'cv', label: { en: 'CV / Resume Download', fr: 'Télécharger CV', ar: 'تحميل السيرة الذاتية' }, enabled: true, order: 5 },
  { id: 'contact', label: { en: 'Contact', fr: 'Contact', ar: 'اتصل بي' }, enabled: true, order: 6 },
];

const cvSettingsSchema = new mongoose.Schema(
  {
    enabled: { type: Boolean, default: true },
    title: {
      en: { type: String, default: 'Curriculum Vitae (CV)' },
      fr: { type: String, default: 'Curriculum Vitae (CV)' },
      ar: { type: String, default: 'السيرة الذاتية (CV)' },
    },
    description: {
      en: { type: String, default: 'Download my up-to-date resume in PDF format or view it online.' },
      fr: { type: String, default: 'Téléchargez mon CV actualisé au format PDF ou consultez-le en ligne.' },
      ar: { type: String, default: 'قم بتحميل نسختي المحدثة من السيرة الذاتية بصيغة PDF أو استعراضها مباشرة.' },
    },
    fileName: { type: String, default: 'CV_Document.pdf' },
  },
  { _id: false }
);

export const settingsSchema = new mongoose.Schema(
  {
    backgroundTheme: {
      type: String,
      default: 'midnight-orchid',
      enum: ['midnight-orchid', 'cyber-matrix', 'deep-cosmos', 'sunset-aurora', 'minimal-mesh'],
    },
    sections: {
      type: [sectionSchema],
      default: defaultSections,
    },
    cvSettings: {
      type: cvSettingsSchema,
      default: () => ({}),
    },
  },
  { timestamps: true }
);

export const Settings = mongoose.model('Settings', settingsSchema);
