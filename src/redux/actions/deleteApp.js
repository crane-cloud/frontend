import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { DELETE_APP_SUCCESS, DELETE_APP_FAIL, START_DELETING_APP } from './actionTypes';

const startDeletingApp = () => ({
  type: START_DELETING_APP,
});

const deleteAppSuccess = (response) => ({
  type: DELETE_APP_SUCCESS,
  payload: response.data.data,
});

const deleteAppFail = (error) => ({
  type: DELETE_APP_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const deleteApp = (appID) => (dispatch) => {
  dispatch(startDeletingApp());

  axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return axios.delete(`${API_BASE_URL}/apps/${appID}`)
    .then((response) => dispatch(deleteAppSuccess(response)))
    .catch((error) => {
      dispatch(deleteAppFail(error));
    });
};

export default deleteApp;
