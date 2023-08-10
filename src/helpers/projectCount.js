import { handleGetRequest } from "../apis/apis.js";

export async function getUserProjects(userID) {
  try {
    const response = await handleGetRequest(`/users/${userID}/projects`);
    const projectsList = response.data.data?.projects || [];
    const activeProjects = projectsList.filter(
      (project) => !project.name.includes("deleted")
    );
    const disabledProjects = activeProjects.filter(
      (project) => project?.disabled === true
    );

    return {
      projectsCount: activeProjects.length,
      activeProjectsCount: activeProjects.length - disabledProjects.length,
      disabledProjectsCount: disabledProjects.length,
    };
  } catch (error) {
    console.error("Error fetching user projects:", error);
    return {
      projectsCount: 0,
      activeProjectsCount: 0,
      disabledProjectsCount: 0,
    };
  }
}
