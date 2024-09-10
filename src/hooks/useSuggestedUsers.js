import { useQuery } from "@tanstack/react-query";
import api from "../axios";

export const useSuggestedUsers = (currentPage = 1) => {
  return useQuery({
    queryFn: () => api.get(`/users?page=${currentPage}`),
    queryKey: ["users", currentPage],
    meta: {
      errorMessage: "Failed to fetch users",
    },
    keepPreviousData: true,
  });
};
