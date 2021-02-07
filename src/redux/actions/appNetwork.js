import axios from '../../axios';
import redirectToLogin from '../../helpers/redirectToLogin';
import {
  FETCH_APP_NETWORK_SUCCESS,
  FETCH_APP_NETWORK_FAILED,
  IS_FETCHING_APP_NETWORK,
  CLEAR_APP_NETWORK
} from './actionTypes';

const startFetchingAppNetworkMetrics = () => ({
  type: IS_FETCHING_APP_NETWORK,
});

const getAppNetworkMetricsSuccess = (ID, response) => (
  {
    type: FETCH_APP_NETWORK_SUCCESS,
    payload: {
      app: ID,
      metrics: response.data.data.values
  },
});

const getAppNetworkMetricsFailed = (ID, error) => ({
  type: FETCH_APP_NETWORK_FAILED,
  payload: {
    app: ID,
    metrics: [],
    error: error.status,
  },
});

const clearAppNetwork = () => ({
  type: CLEAR_APP_NETWORK
});

const getAppNetwork = (projectID, appID, params) => (dispatch) => {
  dispatch(startFetchingAppNetworkMetrics());

  return axios.post(`/projects/${projectID}/apps/${appID}/metrics/network`, params)
    .then((response) => {
      dispatch(getAppNetworkMetricsSuccess(appID, response));
    })
    .catch((error) => {
      if (error.response.status === 401) {
        // function to logout user and redirect user to login
        
        redirectToLogin(dispatch);
      }
      dispatch(getAppNetworkMetricsFailed(appID, error));
    });
};


export default getAppNetwork;
export { clearAppNetwork };