import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { IS_FETCHING, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS_FAILED } from './actionTypes';

export const startTheFetch = () => ({
  type: IS_FETCHING,
});

export const getProjectsSuccess = (response) => (
  {
    type: FETCH_PROJECTS_SUCCESS,
    payload: response.data.data.projects,
  });

export const getProjectsFailed = (error) => ({
  type: FETCH_PROJECTS_FAILED,
  payload: {
    status: false,
    error: error.status,
  },
});

const getProjects = () => (dispatch) => {
  dispatch(startTheFetch());
  return axios.get(`${API_BASE_URL}/projects`)
    .then((response) => dispatch(getProjectsSuccess(response)))
    .catch((error) => {
      dispatch(getProjectsFailed(error));
    });
};

export default getProjects;
