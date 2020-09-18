
import axios from 'axios';
import { API_BASE_URL } from '../../config';

import { GET_APP_LOGS_SUCCESS, GET_APPS_LOGS_FAIL, START_GETTING_APP_LOGS } from './actionTypes';

export const startFetchingLogs = () => ({
  type: START_GETTING_APP_LOGS,
});

export const getLogsSuccess = (response) => ({
  type: GET_APP_LOGS_SUCCESS,
  payload: response.data.data,
});

export const getLogsFail = (error) => ({
  type: GET_APPS_LOGS_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const getAppLogs = (params) => (dispatch) => {
  const { projectID, appID } = params;
  dispatch(startFetchingLogs());

  return axios.get(`${API_BASE_URL}/projects/${projectID}/apps/${appID}/logs`,

    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then((response) => dispatch(getLogsSuccess(response)))
    .catch((error) => {
      dispatch(getLogsFail(error));
    });
};


export default getAppLogs;
