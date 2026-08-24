import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const NamedWhySchema = new Schema({ name: String, why: String }, { _id: false });

const LinksSchema = new Schema(
  {
    demo: String,
    github: String,
    docs: String,
  },
  { _id: false }
);

const OverviewSchema = new Schema(
  {
    purpose: String,
    targetUsers: String,
    businessProblem: String,
    objectives: [String],
  },
  { _id: false }
);

const TechStackSchema = new Schema(
  {
    frontend: [NamedWhySchema],
    backend: [NamedWhySchema],
    database: [NamedWhySchema],
    auth: [NamedWhySchema],
    ai: [NamedWhySchema],
    devops: [NamedWhySchema],
    deployment: [NamedWhySchema],
    libraries: [NamedWhySchema],
  },
  { _id: false }
);

const FeatureSchema = new Schema(
  {
    name: String,
    description: String,
    implementation: String,
    challenges: String,
    benefits: String,
  },
  { _id: false }
);

const ArchitectureSchema = new Schema(
  {
    flow: [String],
    folderStructure: String,
    appFlow: String,
    authFlow: String,
    requestLifecycle: String,
  },
  { _id: false }
);

const CollectionNoteSchema = new Schema({ name: String, notes: String }, { _id: false });

const DatabaseDesignSchema = new Schema(
  {
    collections: [CollectionNoteSchema],
    reasoning: String,
  },
  { _id: false }
);

const AuthFlowSchema = new Schema(
  {
    login: String,
    jwt: String,
    middleware: String,
    notes: String,
  },
  { _id: false }
);

const ScreenshotSchema = new Schema(
  {
    url: { type: String, required: true },
    caption: String,
  },
  { _id: false }
);

const ChallengeSchema = new Schema(
  {
    problem: String,
    why: String,
    solution: String,
    tradeoffs: String,
    lessons: String,
  },
  { _id: false }
);

const PerformanceSchema = new Schema(
  {
    lighthouse: String,
    techniques: [String],
  },
  { _id: false }
);

const SecuritySchema = new Schema(
  {
    considerations: [String],
  },
  { _id: false }
);

const DeploymentSchema = new Schema(
  {
    hosting: String,
    cicd: String,
    prodSetup: String,
  },
  { _id: false }
);

const TimelineEntrySchema = new Schema(
  {
    label: String,
    description: String,
  },
  { _id: false }
);

const RecruiterSummarySchema = new Schema(
  {
    role: String,
    responsibilities: [String],
    impact: [String],
    technologies: [String],
    skills: [String],
  },
  { _id: false }
);

const MetricsSchema = new Schema(
  {
    devTime: String,
    commits: String,
    technologies: String,
  },
  { _id: false }
);

const ProjectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: String,
    oneLiner: String,
    status: String,
    duration: String,
    role: String,
    teamSize: String,
    banner: String,

    links: LinksSchema,
    overview: OverviewSchema,
    techStack: TechStackSchema,
    techStackNote: String,
    features: [FeatureSchema],
    architecture: ArchitectureSchema,
    databaseDesign: DatabaseDesignSchema,

    apiDocs: [Schema.Types.Mixed],
    apiDocsNote: String,

    authFlow: AuthFlowSchema,
    screenshots: [ScreenshotSchema],
    challenges: [ChallengeSchema],
    performance: PerformanceSchema,
    security: SecuritySchema,
    deployment: DeploymentSchema,

    futureImprovements: [String],
    lessonsLearned: [String],
    metrics: MetricsSchema,
    timeline: [TimelineEntrySchema],
    recruiterSummary: RecruiterSummarySchema,
  },
  { timestamps: true }
);

export default models.Project || model("Project", ProjectSchema);
