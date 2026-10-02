import mongoose from 'mongoose';

export const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['frontend', 'backend', 'database', 'tools'],
      default: 'frontend',
    },
    level: {
      type: String,
      default: 'Core',
    },
    highlight: {
      type: Boolean,
      default: false,
    },
    context: {
      en: { type: String, default: '' },
      ar: { type: String, default: '' },
      fr: { type: String, default: '' },
    },
    icon: {
      type: String,
      default: 'Code',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Skill = mongoose.model('Skill', skillSchema);
