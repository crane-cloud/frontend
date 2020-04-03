import axios from 'axios';
import { API_BASE_URL } from '../../config';
import {
  START_ADDING_CLUSTER, ADD_CLUSTER_SUCCESS, ADD_CLUSTERS_FAIL, CLEAR_ADD_CLUSTER_STATE
} from './actionTypes';


const startPostingCluster = () => ({
  type: START_ADDING_CLUSTER,
});

const addClusterSuccess = (response) => ({
  type: ADD_CLUSTER_SUCCESS,
  payload: response.data,
});

const addClusterFail = (error) => ({
  type: ADD_CLUSTERS_FAIL,
  payload: {
    error: error.response.status,
  },
});

const clearState = () => ({
  type: CLEAR_ADD_CLUSTER_STATE
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
export { clearState };
