import api from './../axios';

export async function useAppDeployment(data){
    const projectID = data.projectID;
    delete data.projectID;
    const response = await api.post(`projects/${projectID}/apps`, data);
    return response.data;
  };