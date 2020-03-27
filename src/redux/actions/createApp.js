
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { CREATE_APP_SUCCESS, CREATE_APP_FAIL, START_CREATING_APP } from './actionTypes';

export const startCreatingApp = () => ({
  type: START_CREATING_APP,
});

export const createAppSuccess = (response) => ({
  type: CREATE_APP_SUCCESS,
  payload: response.data.data,
});

export const createAppFail = (error) => ({
  type: CREATE_APP_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const createApp = (appInfo, projectID) => (dispatch) => {
  dispatch(startCreatingApp());

  axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return axios.post(`${API_BASE_URL}/projects/${projectID}/apps`, appInfo)
    .then((response) => dispatch(createAppSuccess(response)))
    .catch((error) => {
      dispatch(createAppFail(error));
    });
};


export default createApp;
