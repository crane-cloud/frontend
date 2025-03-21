import { FaPython } from "react-icons/fa";
import {
  SiTensorflow,
  SiPytorch,
  SiMlflow,
  SiNvidia,
  SiHuggingface,
} from "react-icons/si";
import { MdOutlineSettings } from "react-icons/md";

export const retrieveModelServers = () => {
  const servers = [
    { id: 1, name: "Sklearn", value: "SKLEARN_SERVER", icon: <FaPython /> },
    {
      id: 2,
      name: "Tensorflow",
      value: "TENSORFLOW_SERVER",
      icon: <SiTensorflow />,
    },
    { id: 3, name: "XGBoost", value: "XGBOOST_SERVER", icon: <SiPytorch /> },
    { id: 4, name: "MLflow", value: "MLFLOW_SERVER", icon: <SiMlflow /> },
    { id: 5, name: "Triton", value: "TRITON_SERVER", icon: <SiNvidia /> },
    {
      id: 6,
      name: "Tempo",
      value: "TEMPO_SERVER",
      icon: <MdOutlineSettings />,
    },
    {
      id: 7,
      name: "Huggingface",
      value: "HUGGINGFACE_SERVER",
      icon: <SiHuggingface />,
    },
    {
      id: 8,
      name: "Custom inference",
      value: "CUSTOM_INFERENCE_SERVER",
      icon: <MdOutlineSettings />,
    },
  ];

  return servers;
};
