const aiCategoriesClassification = [
  {
    id: 1,
    name: "Natural Language Processing (NLP)",
    available: true,
    subCategories: [
      {
        name: "Text Classification",
        pyRequirements: [
          "FlagEmbedding",
          "fasttext",
          "safetensors",
          "keras",
          "sentence-transformers",
          "setfit",
          "onnx",
        ],
      },
      {
        name: "Token Classification",
        pyRequirements: ["flair", "stanza"],
      },
      {
        name: "Table Question Answering",
        pyRequirements: ["flair", "tensorboard"],
      },
      {
        name: "Translation",
        pyRequirements: ["jax", "gguf", "peft"],
      },
      {
        name: "Feature Extraction",
        pyRequirements: ["jax", "onnx"],
      },
    ],
  },
  {
    id: 2,
    name: "Computer Vision",
    available: true,
    subCategories: [
      {
        name: "Image Classification",
        pyRequirements: ["efficientnet", "resnet", "albumentations"],
      },
      {
        name: "Image Segmentation",
        pyRequirements: ["chainer-mask-rcnn", "segmentation-models-pytorch"],
      },
      {
        name: "3D Vision",
        pyRequirements: ["open3d", "pytorch3d", "trimesh"],
      },
    ],
  },
  {
    id: 3,
    name: "Reinforcement Learning",
    available: true,
    subCategories: [
      {
        name: "Policy Optimization",
        pyRequirements: ["proximal"],
      },
      {
        name: "Value-based Methods",
        pyRequirements: ["pernaf"],
      },
      {
        name: "Multi-Agent Reinforcement Learning",
        pyRequirements: ["magent", "pettingzoo"],
      },
    ],
  },
  {
    id: 4,
    name: "Speech Recognition/Processing",
    available: false,
    subCategories: [
      {
        name: "Automatic Speech Recognition (ASR)",
        pyRequirements: ["wav2vec", "deepspeech", "nemo-toolkit"],
      },
      {
        name: "Text-to-Speech (TTS)",
        pyRequirements: ["wavenet", "tacotron"],
      },
      {
        name: "Speaker Verification",
        pyRequirements: ["malaya-speech"],
      },
    ],
  },
  {
    id: 5,
    name: "Generative Models",
    available: true,
    subCategories: [
      {
        name: "Generative Adversarial Networks (GANs)",
        pyRequirements: ["stylegan2-pytorch", "chainer-cyclegan", "ganzoo"],
      },
      {
        name: "Variational Autoencoders (VAEs)",
        pyRequirements: ["vae"],
      },
      {
        name: "Diffusion Models",
        pyRequirements: ["ddpm"],
      },
    ],
  },
  {
    id: 6,
    name: "Data Engineering and Preprocessing",
    available: true,
    subCategories: [
      {
        name: "Data Transformation and Cleaning",
        pyRequirements: ["great-expectations", "pyjanitor"],
      },
      {
        name: "Data Pipeline Orchestration",
        pyRequirements: ["airflow", "prefect", "luigi"],
      },
      {
        name: "Distributed Computing",
        pyRequirements: ["ray", "dask"],
      },
    ],
  },
];

export default aiCategoriesClassification;
