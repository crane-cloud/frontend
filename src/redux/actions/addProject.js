import axios from 'axios';
import { API_BASE_URL } from '../../config.js';
import { START_ADDING_CLUSTER, ADD_CLUSTER_SUCCESS, ADD_CLUSTERS_FAIL } from '../actions/actionTypes';


const startPostingProject = () => ({
  type: START_ADDING_CLUSTER,
});

export const addProjectSuccess = (response) => ({
  type: ADD_CLUSTER_SUCCESS,
  payload: response.data,
});

export const addProjectFail = (error) => ({
  type: ADD_CLUSTERS_FAIL,
  payload: {
    error: error.response.status,
  },
});

const AddProject = (clusterData) => (dispatch) => {
  dispatch(startPostingCluster());

  return axios.post(`${API_BASE_URL}/projects`, clusterData,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then((response) => dispatch(addProjectSuccess(response)))
    .catch((error) => {
      dispatch(addProjectFail(error));
    });
};
export default AddProject;
