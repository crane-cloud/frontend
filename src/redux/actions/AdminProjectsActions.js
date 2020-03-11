import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { IS_FETCHING, FETCH_ADMIN_PROJECTS_SUCCESS, FETCH_ADMIN_PROJECTS_FAILED } from './actionTypes';

export const startTheFetch = () => ({
  type: IS_FETCHING,
});

export const getAdminProjectsSuccess = (response) => (
  {
    type: FETCH_ADMIN_PROJECTS_SUCCESS,
    payload: response.data.data,
  });

export const getAdminProjectsFailed = (error) => ({
  type: FETCH_ADMIN_PROJECTS_FAILED,
  payload: {
    status: false,
    error: error.status,
  },
});

const getAdminProjects = () => (dispatch) => {
  dispatch(startTheFetch());
  return axios.get(`${API_BASE_URL}/projects`)
    .then((response) => dispatch(getAdminProjectsSuccess(response)))
    .catch((error) => {
      dispatch(getAdminProjectsFailed(error));
    });
};

export default getAdminProjects;
