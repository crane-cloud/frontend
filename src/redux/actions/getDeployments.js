import axios from 'axios';
import { API_BASE_URL } from '../../config';
import {
  GET_DEPLOYMENTS_SUCCESS,
  GET_DEPLOYMENTS_FAIL,
  GETTING_DEPLOYMENTS
} from './actionTypes';

const startGettingDeployments = () => ({
  type: GETTING_DEPLOYMENTS
});

const getDeploymentsSuccess = (response) => ({
  type: GET_DEPLOYMENTS_SUCCESS,
  payload: response.data.data.deployments
});

const getDeploymentsFail = (error) => ({
  type: GET_DEPLOYMENTS_FAIL,
  payload: {
    status: false,
    error: error.status,
  }
});

const getDeployments = (clusterID) => (dispatch) => {
  dispatch(startGettingDeployments());

  axios.get(`${API_BASE_URL}/clusters/${clusterID}/deployments`)
    .then((response) => dispatch(getDeploymentsSuccess(response)))
    .catch((error) => dispatch(getDeploymentsFail(error)));
};

export default getDeployments;
export { startGettingDeployments, getDeploymentsSuccess, getDeploymentsFail };
