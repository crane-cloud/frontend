import { useQuery } from "@tanstack/react-query";
import api from "../axios";

export const useTag = (id) => {
  return useQuery({
    queryFn: () => api.get(`/tags/${id}`),
    queryKey: ["tag", id],
    meta: {
      errorMessage: "Failed to fetch tags",
    },
  });
};
