import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { START_ADDING_CLUSTER, ADD_CLUSTER_SUCCESS, ADD_CLUSTERS_FAIL } from '../actions/actionTypes';


const startPostingCluster = () => ({
  type: START_ADDING_CLUSTER,
});

export const addClusterSuccess = (response) => ({
  type: ADD_CLUSTER_SUCCESS,
  payload: response.data,
});

export const addClusterFail = (error) => ({
  type: ADD_CLUSTERS_FAIL,
  payload: {
    error: error.response.status,
  },
});

const AddCluster = (clusterData) => (dispatch) => {
  dispatch(startPostingCluster());

  return axios.post(`${API_BASE_URL}/clusters`, clusterData,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then((response) => dispatch(addClusterSuccess(response)))
    .catch((error) => {
      dispatch(addClusterFail(error));
    });
};
export default AddCluster;
