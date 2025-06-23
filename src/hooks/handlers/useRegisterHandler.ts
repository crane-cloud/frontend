import { DATABASE_API_URL } from "@/config";
import useVolumes from "../cluster/useVolumes";
import { useDatabases } from "../useDatabases";
import { useProjects } from "../useProjects";
import { useUsers } from "../useUsers";
import usePods from "../cluster/usePods";
import useServices from "../cluster/useServices";

// handle register creation
export const registerHooks: Record<string, any> = {
  users: useUsers,
  databases: useDatabases,
  projects: useProjects,
  // cluster
  volumes: useVolumes,
  pods: usePods,
  services: useServices,
};

export const sourceApis: Record<string, string> = {
  users: "/users",
  databases: `${DATABASE_API_URL}/databases`,
  projects: `/projects`,
};
