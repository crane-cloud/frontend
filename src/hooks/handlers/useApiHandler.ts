import { DATABASE_API_URL } from "@/config";

export const sourceApis: Record<string, string> = {
  users: "/users",
  databases: `${DATABASE_API_URL}/databases`,
  projects: `/projects`,
};
