import axios from '../../axios';
import redirectToLogin from '../../helpers/redirectToLogin';
import { IS_FETCHING, FETCH_ADMIN_PROJECTS_SUCCESS, FETCH_ADMIN_PROJECTS_FAILED } from './actionTypes';

export const startTheFetch = () => ({
  type: IS_FETCHING,
});

export const getAdminProjectsSuccess = (response) => (
  {
    type: FETCH_ADMIN_PROJECTS_SUCCESS,
    payload: response.data.data.projects,
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
  return axios.get(`/projects`)
    .then((response) => dispatch(getAdminProjectsSuccess(response)))
    .catch((error) => {
      if (error.response.status === 401) {
        // function to logout user and redirect user to login
        
        redirectToLogin(dispatch);
      }
      dispatch(getAdminProjectsFailed(error));
    });
};

export default getAdminProjects;
