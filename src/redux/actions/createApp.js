import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { CREATE_APP_SUCCESS, CREATE_APP_FAIL, START_CREATING_APP } from './actionTypes';

const startCreatingApp = () => ({
  type: START_CREATING_APP,
});

const createAppSuccess = (response) => ({
  type: CREATE_APP_SUCCESS,
  payload: response.data.data,
});

const createAppFail = (error) => ({
  type: CREATE_APP_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const createApp = (appInfo, projectID) => (dispatch) => {
  dispatch(startCreatingApp());

  axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  axios.post(`${API_BASE_URL}/projects/${projectID}/apps`, appInfo)
    .then((response) => dispatch(createAppSuccess(response)))
    .catch((error) => {
      dispatch(createAppFail(error));
    });
};


export default createApp;
