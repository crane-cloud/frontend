import { useDatabases } from "../useDatabases";
import { useUsers } from "../useUsers";

// handle register creation
export const registerHooks: Record<string, any> = {
  users: useUsers,
  databases: useDatabases,
};
