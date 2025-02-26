import { useQuery } from "@tanstack/react-query";
import {userActivityLoggerAxios} from "./../axios";

export const useRecentActivity = (page, userID) => {
  let link;
  if (userID !== "") {
    link = `/activities?user_id=${userID}&page=${page}`;
  } else {
    link = `/activities?general=true`;
  }

  return useQuery({
    queryFn: ()=> userActivityLoggerAxios.get(link),
    queryKey: ["userRecentActivities", page,userID], 
    enabled: !!userID, 
    meta: {
      errorMessage: "Failed to fetch recent activities",
    },
  });
};
