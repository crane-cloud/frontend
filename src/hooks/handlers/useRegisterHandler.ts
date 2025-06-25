import { DATABASE_API_URL } from "@/config";
import useVolumes from "../cluster/useVolumes";
import { useDatabases } from "../useDatabases";
import { useProjects } from "../useProjects";
import { useUsers } from "../useUsers";
import useServices from "../cluster/useServices";
import { useApps } from "../useApps";
import useVolumeClaims from "../cluster/useVolumeClaims";

// handle register creation
export const registerHooks: Record<string, any> = {
  users: useUsers,
  databases: useDatabases,
  projects: useProjects,
  apps: useApps,
  // cluster
  volumes: useVolumes,
  services: useServices,
  volume_claims: useVolumeClaims
};

export const sourceApis: Record<string, string> = {
  users: "/users",
  databases: `${DATABASE_API_URL}/databases`,
  projects: `/projects`,
  apps: `/apps`,
};
