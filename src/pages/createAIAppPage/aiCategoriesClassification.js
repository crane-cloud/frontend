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
          "onnx"
        ],
      },
      {
        name: "Token Classification",
        pyRequirements: [
          "flair",
          "stanza"
        ],
      },
      {
        name: "Table Question Answering",
        pyRequirements: [
           "flair",
           "tensorboard"
        ],
      },
      {
        name: "Translation",
        pyRequirements: [
           "jax",
           "gguf",
           "peft"
        ],
      },
      {
        name: "Feature Extraction",
        pyRequirements: [
           "jax",
           "onnx"
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Computer Vision",
    available: false,
    subCategories: []
  },
  {
    id: 3,
    name: "Deep Learning",
    available: false,
    subCategories: []
  },
  {
    id: 4,
    name: "Machine Learning",
    available: false,
    subCategories: []
  },
  {
    id:5,
    name: "Recommendation Systems",
    available: false,
    subCategories: []
  }
];

export default aiCategoriesClassification;
