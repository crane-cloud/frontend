import axios from 'axios';
import { GET_DEPLOYMENTS } from './actionTypes';
import { API_BASE_URL } from '../../config';

const getDeployments = () => (dispatch) => {
  axios.get(`${API_BASE_URL}/clusters/dd66c9a7-dd48-4616-9438-166258e77453/deployments`)
    .then((response) => {
      console.log(response.data.data.deployments);
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
