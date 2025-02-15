import React from "react";
import { useGetApp } from "@/utils/helpers";
import { useParams } from "react-router-dom";

const AppDetailPage = () => {
  const { app_id } = useParams();
  const { app } = useGetApp(app_id || "");
  return <div>{app.name}</div>;
};

export default AppDetailPage;
