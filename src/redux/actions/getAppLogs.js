
import axios from 'axios';
import { API_BASE_URL } from '../../config';

import { GET_APP_LOGS_SUCCESS, GET_APPS_LOGS_FAIL, START_GETTING_APP_LOGS } from './actionTypes';

const startFetchingLogs = () => ({
  type: START_GETTING_APP_LOGS,
});

const getLogsSuccess = (response) => ({
  type: GET_APP_LOGS_SUCCESS,
  payload: response.data.data.pods_logs,
});

const getLogsFail = (error) => ({
  type: GET_APPS_LOGS_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const getAppLogs = (IDs, params) => (dispatch) => {
  const { projectID, appID } = IDs;
  dispatch(startFetchingLogs());

  return axios.post(`${API_BASE_URL}/projects/${projectID}/apps/${appID}/logs`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      params
    })
    .then((response) => dispatch(getLogsSuccess(response)))
    .catch((error) => {
      dispatch(getLogsFail(error));
    });
};


export default getAppLogs;
