// import { browserHistory } from 'react-router'
import axios from '../../axios';
import removeUser from '../actions/removeUser';
// import redirectToLogin from '../../helpers/redirectToLogin';

import { GET_APPS_SUCCESS, GET_APPS_FAIL, START_GETTING_APPS } from './actionTypes';

export const startFetchingApps = () => ({
  type: START_GETTING_APPS,
});

export const getAppsSuccess = (response) => ({
  type: GET_APPS_SUCCESS,
  payload: response.data.data,
});

export const getAppsFail = (error) => ({
  type: GET_APPS_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const getAppsList = (projectID) => (dispatch) => {
  dispatch(startFetchingApps());

  return axios.get(`/projects/${projectID}/apps`,)

    .then((response) => dispatch(getAppsSuccess(response)))
    .catch((error) => {
      if (error.response.status === 401) {
        //function to logout user and redirect user to login
        removeUser();
        localStorage.removeItem('state');
        localStorage.removeItem('token');
        localStorage.removeItem('project');
        
        window.location.href = '/login';
        // console.log(error.response);
        // Go to login
        // browserHistory.push('/login')
      }
      // redirectToLogin();
      dispatch(getAppsFail(error));
    });
};


export default getAppsList;
