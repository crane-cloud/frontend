import axios from 'axios';
import { GET_DEPLOYMENTS } from './actionTypes';
import { API_BASE_URL } from '../../config';

const getDeployments = (clusterID) => (dispatch) => {
  axios.get(`${API_BASE_URL}/clusters/${clusterID}/deployments`)
    .then((response) => {
      console.log(response.data.data.deployments);
      debugger;
      dispatch({
        type: GET_DEPLOYMENTS,
        payload: response.data.data.deployments
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getDeployments;
