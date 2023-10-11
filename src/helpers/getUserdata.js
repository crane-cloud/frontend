import { handleGetRequest } from "../apis/apis.js";

export async function getUserdata(userID) {
  try {
    const response = await handleGetRequest(`/users/${userID}`);
    const userData = response.data.data.user || {};
    const appsCount = userData.apps_count || 0;
    const databasesCount = userData.database_count || 0;

    return {
      appsCount,
      databasesCount,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      appsCount: 0,
      databasesCount: 0,
    };
  }
}
