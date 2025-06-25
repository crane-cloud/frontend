import { DATABASE_API_URL } from "@/config";
import useVolumes from "../cluster/useVolumes";
import { useDatabases } from "../useDatabases";
import { useProjects } from "../useProjects";
import { useUsers } from "../useUsers";
import usePods from "../cluster/usePods";
import useServices from "../cluster/useServices";
import useNodeList from "../cluster/useNodes";
import { useApps } from "../useApps";
import useNamespaces from "../cluster/useNamespaces";
import useDeployments from "../cluster/useDeployments";

// handle register creation
export const registerHooks: Record<string, any> = {
  users: useUsers,
  databases: useDatabases,
  projects: useProjects,
  apps: useApps,
  // cluster
  volumes: useVolumes,
  pods: usePods,
  services: useServices,
  namespaces: useNamespaces,
  nodes: useNodeList,
  deployments: useDeployments
  
};

export const sourceApis: Record<string, string> = {
  users: "/users",
  databases: `${DATABASE_API_URL}/databases`,
  projects: `/projects`,
  apps: `/apps`,
};
