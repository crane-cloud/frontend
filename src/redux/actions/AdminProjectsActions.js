import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { IS_FETCHING, FETCH_ADMINPROJECTS_SUCCESS, FETCH_ADMINPROJECTS_FAILED } from './actionTypes';

export const startTheFetch = () => ({
  type: IS_FETCHING,
});

export const getAdminProjectsSuccess = (response) => (
  {
    type: FETCH_ADMINPROJECTS_SUCCESS,
    payload: response.data.data.projects,
  });

export const getAdminProjectsFailed = (error) => ({
  type: FETCH_ADMINPROJECTS_FAILED,
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
