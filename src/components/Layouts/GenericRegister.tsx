import { useParams } from "react-router-dom";
import RegisterLayoutHandler from "./RegisterLayoutHandler";
import { TFormHandlerParams } from "@/types/common";

const GenericRegister = () => {
  const { id, source_id } = useParams<keyof TFormHandlerParams>();
  return <RegisterLayoutHandler key={`${source_id}${id}`} />;
};

export default GenericRegister;
