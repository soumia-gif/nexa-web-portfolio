import mongoose from 'mongoose';

const metricSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    change: { type: String, default: '' },
  },
  { _id: false }
);

const architectureHighlightSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    badge: { type: String, default: '' },
  },
  { _id: false }
);

const stackCategorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    technologies: [{ type: String }],
  },
  { _id: false }
);

const keyChallengeSchema = new mongoose.Schema(
  {
    challenge: { type: String, required: true },
    resolution: { type: String, required: true },
  },
  { _id: false }
);

export const projectSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      en: { type: String, required: true },
      ar: { type: String, default: '' },
      fr: { type: String, default: '' },
    },
    subtitle: {
      en: { type: String, default: '' },
      ar: { type: String, default: '' },
      fr: { type: String, default: '' },
    },
    summary: {
      en: { type: String, default: '' },
      ar: { type: String, default: '' },
      fr: { type: String, default: '' },
    },
    category: {
      type: String,
      required: true,
      default: 'Full-Stack',
    },
    badge: {
      type: String,
      default: '',
    },
    flagship: {
      type: Boolean,
      default: false,
    },
    coverGradient: {
      type: String,
      default: 'from-pink-900/50 via-purple-950/40 to-rose-950/40',
    },
    image: {
      type: String,
      default: '',
    },
    metrics: [metricSchema],
    techStack: [
      {
        type: String,
        trim: true,
      },
    ],
    caseStudy: {
      overview: { type: String, default: '' },
      theProblem: { type: String, default: '' },
      architecturalSolution: { type: String, default: '' },
      architectureHighlights: [architectureHighlightSchema],
      stackBreakdown: [stackCategorySchema],
      schemaAndSecurity: { type: String, default: '' },
      keyChallenges: [keyChallengeSchema],
      measurableImpact: [metricSchema],
      githubUrl: { type: String, default: '' },
      liveUrl: { type: String, default: '' },
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
