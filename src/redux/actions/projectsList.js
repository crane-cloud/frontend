import axios from '../../axios';
import redirectToLogin from '../../helpers/redirectToLogin';


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

const getUserProjects = (userID) => (dispatch) => {
  dispatch(startTheFetch());
  return axios.get(`/users/${userID}/projects`)
    
    .then((response) => dispatch(getUserProjectsSuccess(response)))
    .catch((error) => {
      if (error.response.status === 401) {
        // function to logout user and redirect user to login
        
        redirectToLogin(dispatch);
      }
      
      dispatch(getUserProjectsFailed(error));
    });
};

export default getUserProjects;
