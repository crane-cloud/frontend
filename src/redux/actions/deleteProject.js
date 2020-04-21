import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { DELETE_PROJECT_SUCCESS, DELETE_PROJECT_FAIL, START_DELETING_PROJECT } from './actionTypes';

const startDeletingProject = () => ({
  type: START_DELETING_PROJECT,
});

const deleteProjectSuccess = (response) => ({
  type: DELETE_PROJECT_SUCCESS,
  payload: response.data.data,
});

const deleteProjectFail = (error) => ({
  type: DELETE_PROJECT_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const deleteProject = (ProjectID) => (dispatch) => {
  dispatch(startDeletingProject());

  axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return axios.delete(`${API_BASE_URL}/projects/${ProjectID}`)
    .then((response) => dispatch(deleteProjectSuccess(response)))
    .catch((error) => {
      dispatch(deleteProjectFail(error));
    });
};

export default deleteProject;
