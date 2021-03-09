import axios from '../../axios';
import {
  FETCH_PROJECT_DATABASES_SUCCESS,
  FETCH_PROJECT_DATABASES_FAILED,
  IS_FETCHING_PROJECT_DATABASES,
  CLEAR_PROJECT_DATABASES
} from './actionTypes';

const startFetchingDatabases = () => ({
  type: IS_FETCHING_PROJECT_DATABASES,
});

const getDatabasesSuccess = (response) => (
  {
    type: FETCH_PROJECT_DATABASES_SUCCESS,
    payload: response.data.data.databases,
  });

const getDatabasesFailed = (ID, error) => ({
  type: FETCH_PROJECT_DATABASES_FAILED,
  payload: {
    databases: [],
    error: error.status,
  },
});

const clearProjectDatabases = () => ({
  type: CLEAR_PROJECT_DATABASES
});

const getProjectDatabases = (projectID) => (dispatch) => {
  dispatch(startFetchingDatabases());

  return axios.get(`/projects/${projectID}/databases`)
    .then((response) => {
      dispatch(getDatabasesSuccess(response));
    })
    .catch((error) => {
      dispatch(getDatabasesFailed(error));
    });
};


export default getProjectDatabases;
export { clearProjectDatabases };
