
import axios from '../../axios';
// import redirectToLogin from '../../helpers/redirectToLogin';

import { GET_CLUSTERS, GET_CLUSTERS_FAIL, START_GETTING_CLUSTERS } from './actionTypes';

export const startFetchingClusters = () => ({
  type: START_GETTING_CLUSTERS,
});

export const getClustersSuccess = (response) => ({
  type: GET_CLUSTERS,
  payload: response.data.data.clusters,
});

export const getClustersFail = (error) => ({
  type: GET_CLUSTERS_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const getClustersList = () => (dispatch) => {
  dispatch(startFetchingClusters());

  return axios.get('/clusters',)
    
    .then((response) => dispatch(getClustersSuccess(response)))
    .catch((error) => {
      // if (error.response.status === 401) {
      //   //function to logout user and redirect user to login
      //   redirectToLogin(dispatch);
      // }
      dispatch(getClustersFail(error));
    });
};

export default getClustersList;
