import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { IS_FETCHING, FETCH_USER_PROJECTS_SUCCESS, FETCH_USER_PROJECTS_FAILED } from './actionTypes';

export const startTheFetch = () => ({
  type: IS_FETCHING,
});

export const getUserProjectsSuccess = (response) => (
  {
    type: FETCH_USER_PROJECTS_SUCCESS,
    payload: response.data.data.projects,
  });

export const getUserProjectsFailed = (error) => ({
  type: FETCH_USER_PROJECTS_FAILED,
  payload: {
    status: false,
    error: error.status,
  },
});

const getUserProjects = () => (dispatch) => {
  dispatch(startTheFetch());
  return axios.get(`${API_BASE_URL}/projects`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then((response) => dispatch(getUserProjectsSuccess(response)))
    .catch((error) => {
      dispatch(getUserProjectsFailed(error));
    });
};

export default getUserProjects;
