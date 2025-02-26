import { useQuery } from '@tanstack/react-query';
import api from './../axios';

export const useAppList = (category = "", page) => {
  let link = `/apps?page=${page}`;

  if (category && category !== "all") {
    link += `&${category}=true`;
  }

  return useQuery({
    queryFn: () => api.get(link),
    queryKey: ["adminAppsList", category, page],
    meta: {
      errorMessage: "Failed to fetch all apps",
    },
  });
};