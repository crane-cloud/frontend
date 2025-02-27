import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mlopsAxios } from "./../axios";

// fetch all experiments for user
export const useUserExperimentList = (userId) => {
  return useQuery({
    queryKey: ["userExperiments", userId],
    queryFn: async () => {
      const response = await mlopsAxios.get(`/experiments?user_id=${userId}`);
      return response.data.data;
    },
  });
};

// fetch all experiments for app
export const useAppExperimentList = (appAlias) => {
  return useQuery({
    queryKey: ["appExperiments", appAlias],
    queryFn: async () => {
      const response = await mlopsAxios.get(
        `/experiments?app_alias=${appAlias}`
      );
      return response.data.data;
    },
    enabled: !!appAlias,
  });
};

// fetch experiment details by ID
export const useExperimentDetails = (experimentId) => {
  return useQuery({
    queryKey: ["experiment", experimentId],
    queryFn: async () => {
      const response = await mlopsAxios.get(`/experiments/${experimentId}`);
      return response.data.data;
    },
    enabled: !!experimentId,
  });
};

// fetch experiment runs by experiment ID
export const useExperimentRuns = (experimentId) => {
  return useQuery({
    queryKey: ["experimentRuns", experimentId],
    queryFn: async () => {
      const response = await mlopsAxios.get(
        `/experiments/${experimentId}/runs`
      );
      return response.data.data;
    },
    enabled: !!experimentId,
  });
};

// fetch run details by ID
export const useExperimentRunDetails = (runId) => {
  return useQuery({
    queryKey: ["experimentRun", runId],
    queryFn: async () => {
      const response = await mlopsAxios.get(`/run/${runId}`);
      return response.data.data;
    },
    enabled: !!runId,
  });
};

// download artifacts for an experiment run
export const useExperimentRunArtifacts = (experimentId, runId) => {
  return useQuery({
    queryKey: ["downloadArtifact", experimentId, runId],
    queryFn: async () => {
      const response = await mlopsAxios.get(
        `/artifacts/${experimentId}/download/${runId}/model`,
        { responseType: "blob" }
      );
      return response.data;
    },
    enabled: false,
  });
};

// create an experiment
export const useExperimentCreate = (appAlias, userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      console.log(`${appAlias}, ${userId}`);
      const response = await mlopsAxios.post(
        `/experiments?user_id=${userId}&app_alias=${appAlias}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["appExperiments"]);
    },
  });
};

// delete a notebook experiment run by ID
export const useExperimentRunDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (runId) => {
      const response = await mlopsAxios.delete(`/run/${runId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["experimentRuns"]);
    },
  });
};

// delete a notebook experiment by ID
export const useExperimentDelete = (experimentId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await mlopsAxios.delete(`/experiments/${experimentId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["appExperiments"]);
    },
  });
};
