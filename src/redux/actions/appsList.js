
import axios from 'axios';
import { API_BASE_URL } from '../../config';

import { GET_APPS_SUCCESS, GET_APPS_FAIL, START_GETTING_APPS } from './actionTypes';

export const startFetchingApps = () => ({
  type: START_GETTING_APPS,
});

export const getAppsSuccess = (response) => ({
  type: GET_APPS_SUCCESS,
  payload: response.data.data,
});

export const getAppsFail = (error) => ({
  type: GET_APPS_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const getAppsList = (projectID) => (dispatch) => {
  dispatch(startFetchingApps());

  return axios.get(`${API_BASE_URL}/projects/${projectID}/apps`,

    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then((response) => dispatch(getAppsSuccess(response)))
    .catch((error) => {
      dispatch(getAppsFail(error));
    });
};


export default getAppsList;
