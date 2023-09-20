import { handleGetRequest } from "../apis/apis";

export const isUserAdmin = async (currentUser) => {
  if (!currentUser?.data?.id) {
    return false;
  }

  try {
    const response = await handleGetRequest(
      `/user/${currentUser.data.id}/roles`
    );
    return response.data.data.user_roles.some(
      (role) => role.name === "administrator"
    );
  } catch (error) {
    return false;
  }
};
