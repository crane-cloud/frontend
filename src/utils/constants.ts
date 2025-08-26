import { DeploymentInstruction } from "@/components/Forms/CreateAppForm";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import {
  SiHuggingface,
  SiMlflow,
  SiReact,
  SiScikitlearn,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiNuxtdotjs,
  SiSvelte,
  SiGatsby,
  SiRemix,
  SiSolid,
  SiPreact,
  SiVite,
  SiWebpack,
  SiSnowpack,
  SiNodedotjs,
  SiFlask,
  SiDjango,
  SiLaravel,
} from "react-icons/si";

// Boolean values
export const YES = "Yes";
export const NO = "No";

export const ORGANISATIONS = [
  { label: "Start-up", id: 1, value: "Startup" },
  { label: "Company", id: 2, value: "Company" },
  { label: "University Project", id: 3, value: "University-Project" },
  { label: "Final Year Project", id: 4, value: "Final-Year-Project" },
  { label: "Individual", id: 6, value: "Individual" },
];

export const PROJECT_TYPES = [
  { label: "Personal", id: 1, value: "Personal" },
  { label: "Student", id: 2, value: "Student" },
  { label: "Commercial", id: 3, value: "Commercial" },
  { label: "Charity", id: 4, value: "Charity" },
  { label: "Research", id: 5, value: "Research" },
  { label: "Other", id: 6, value: "Others" },
];

export const MODAL_API_TYPES = [
  { label: "REST", id: 1, value: "REST" },
  { label: "GRPC", id: 2, value: "GRPC" },
];

export const SOCIAL_LINKS_DATA = [
  {
    value: "twitter",
    label: "Twitter",
    icon: FaTwitter,
    color: "#1DA1F2",
  },
  {
    value: "github",
    label: "GitHub",
    icon: FaGithub,
    color: "#000000",
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    icon: FaLinkedin,
    color: "#0077B5",
  },
];

export const MODAL_SERVERS = [
  {
    label: "SKLEARN",
    id: 1,
    value: "SKLEARN_SERVER",
    icon: SiScikitlearn,
    color: "#F7931E",
  },

  {
    label: "MLFlow",
    id: 4,
    value: "MLFLOW_SERVER",
    icon: SiMlflow,
    color: "#0194E2",
  },
  {
    label: "Hugging Face",
    id: 7,
    value: "HUGGINGFACE_SERVER",
    icon: SiHuggingface,
    color: "#F7931E",
  },
  // { label: "Triton", id: 5, value: "TRITON_SERVER" },
  // { label: "Tempo", id: 6, value: "TEMPO_SERVER" },
  // { label: "TENSORFLOW", id: 2, value: "TENSORFLOW_SERVER" },
  // { label: "XGBOOST", id: 3, value: "XGBOOST_SERVER" },
  // { label: "Custom Inference", id: 8, value: "CUSTOM_INFERENCE_SERVER" },
];

export const DATABASE_FLAVOURS = [
  { label: "PostgreSQL", id: 1, value: "postgres" },
  { label: "MySQL", id: 2, value: "mysql" },
];

export const FRAMEWORKS = [
  { id: 1, label: "React", value: "react", icon: SiReact },
  {
    id: 2,
    label: "Create React App",
    value: "create-react-app",
    icon: SiReact,
  },
  { id: 3, label: "Next.js", value: "next.js", icon: SiNextdotjs },
  { id: 4, label: "Vue.js", value: "vue.js", icon: SiVuedotjs },
  { id: 5, label: "Angular", value: "angular", icon: SiAngular },
  { id: 6, label: "Nuxt.js", value: "nuxt.js", icon: SiNuxtdotjs },
  { id: 7, label: "Svelte", value: "svelte", icon: SiSvelte },
  { id: 8, label: "SvelteKit", value: "sveltekit", icon: SiSvelte },
  { id: 9, label: "Gatsby", value: "gatsby", icon: SiGatsby },
  { id: 10, label: "Remix", value: "remix", icon: SiRemix },
  { id: 11, label: "SolidJS", value: "solidjs", icon: SiSolid },
  { id: 12, label: "Preact", value: "preact", icon: SiPreact },
  { id: 13, label: "Vite", value: "vite", icon: SiVite },
  { id: 14, label: "Webpack", value: "webpack", icon: SiWebpack },
  // { id: 15, label: "Rollup", value: "rollup", icon: SiRollup },
  // { id: 16, label: "Parcel", value: "parcel", icon: SiParcel },
  { id: 17, label: "Snowpack", value: "snowpack", icon: SiSnowpack },
  { id: 18, label: "HTML-CSS-JS", value: "Html-CSS-JS" },
  { id: 19, label: "Node.js", value: "nodejs", icon: SiNodedotjs },
  { id: 20, label: "Flask", value: "flask", icon: SiFlask },
  { id: 21, label: "Django", value: "django", icon: SiDjango },
  { id: 22, label: "Laravel", value: "Laravel-custom", icon: SiLaravel },
];

export const REGISTRIES = [
  { id: 1, label: "Dockerhub", value: "Dockerhub" },
  { id: 2, label: "Harbor", value: "Harbor" },
];

// Instructions configuration for each model server type
export const MODEL_DEPLOYMENT_INSTRUCTIONS: Record<
  string,
  DeploymentInstruction
> = {
  HUGGINGFACE_SERVER: {
    title: "Hugging Face Model Deployment Guide",
    icon: SiHuggingface,
    color: "yellow",
    description:
      "Deploy state-of-the-art models directly from Hugging Face Hub with our seamless integration.",
    sections: [
      {
        title: "Requirements Checklist",
        colorKey: "blue.7",
        items: [
          {
            label: "Model Repository:",
            description: "Use the complete repository path",
            code: "username/model-name",
          },
          {
            label: "Inference Support:",
            description:
              "Verify the model has inference API enabled on Hugging Face",
          },
          {
            label: "Authentication:",
            description:
              "Ensure you have access tokens if the model is private",
          },
          {
            label: "Compatibility:",
            description:
              "Model must be compatible with the transformers library",
          },
        ],
      },
      {
        title: "Example Repository Paths",
        colorKey: "blue.7",
        examples: [
          {
            code: "microsoft/DialoGPT-medium",
            description: "Conversational AI",
          },
          { code: "bert-base-uncased", description: "Text classification" },
          { code: "gpt2", description: "Text generation" },
        ],
      },
    ],
  },
  MLFLOW_SERVER: {
    title: "MLflow Model Deployment Guide",
    icon: SiMlflow,
    color: "blue",
    description:
      "Deploy models from your MLflow Model Registry with enterprise-grade tracking and versioning.",
    sections: [
      {
        title: "Prerequisites",
        colorKey: "orange.7",
        items: [
          {
            label: "MLflow Server:",
            description:
              "Ensure your MLflow tracking server is accessible and running",
          },
          {
            label: "Model Registration:",
            description:
              "Model must be properly logged and registered in MLflow",
          },
          {
            label: "URI Format:",
            description: "Use the correct MLflow model URI format",
          },
          {
            label: "Dependencies:",
            description:
              "All model dependencies must be included in the MLflow model",
          },
        ],
      },
      {
        title: "Supported URI Formats",
        colorKey: "orange.7",
        examples: [
          {
            code: "runs:/abc123def456/model",
            description: "Deploy from specific run",
          },
          {
            code: "models:/MyModel/1",
            description: "Deploy version 1 of registered model",
          },
          {
            code: "models:/MyModel/Production",
            description: "Deploy from production stage",
          },
        ],
      },
      {
        title: "Supported Frameworks",
        colorKey: "orange.7",
        frameworks: [
          "scikit-learn",
          "pytorch",
          "tensorflow",
          "xgboost",
          "lightgbm",
        ],
      },
    ],
  },
  SKLEARN_SERVER: {
    title: "Scikit-learn Model Deployment Guide",
    icon: SiScikitlearn,
    color: "orange",
    description:
      "Deploy your scikit-learn models with optimized serialization and fast inference capabilities.",
    sections: [
      {
        title: "Model Requirements",
        colorKey: "green.7",
        items: [
          {
            label: "Serialization:",
            description: "Model must be saved using pickle or joblib format",
          },
          {
            label: "Methods:",
            description: "Model must implement",
            code: "predict()",
          },
          {
            label: "Dependencies:",
            description: "Ensure scikit-learn version compatibility",
          },
          {
            label: "Preprocessing:",
            description: "Include feature preprocessing pipeline if required",
          },
        ],
      },
      {
        title: "Supported File Formats",
        colorKey: "green.7",
        examples: [
          {
            code: "model.pkl",
            description: "Standard pickle format (Python built-in)",
          },
          {
            code: "model.joblib",
            description: "Joblib format (recommended for NumPy arrays)",
          },
          {
            code: "pipeline.pkl",
            description: "Complete preprocessing + model pipeline",
          },
        ],
      },
      {
        title: "Best Practices",
        colorKey: "green.7",
        items: [
          {
            description: "Use",
            code: "joblib",
            additional: "for models with large NumPy arrays",
          },
          {
            description: "Include feature scaling/encoding in your pipeline",
          },
          {
            description: "Test model loading before deployment",
          },
          {
            description: "Document expected input format and feature names",
          },
        ],
      },
    ],
  },
};
