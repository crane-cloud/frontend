import { useQuery } from "@tanstack/react-query";
import api from './../axios';

export const useTags = (keywords) => {
    return useQuery({
      queryFn: () => api.get(`/tags?keywords=${keywords}`),
      queryKey: ["tags"],
      meta: {
        errorMessage: "Failed to fetch tags"
      }
      
    });
  }