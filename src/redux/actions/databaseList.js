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

const getDatabasesSuccess = (ID, response) => (
  {
    type: FETCH_PROJECT_DATABASES_SUCCESS,
    payload: {
      project: ID,
      databases: response.data.data
    },
  });

const getDatabasesFailed = (ID, error) => ({
  type: FETCH_PROJECT_DATABASES_FAILED,
  payload: {
    project: ID,
    databases: [],
    error: error.status,
  },
});

const clearProjectDatabases = () => ({
  type: CLEAR_PROJECT_DATABASES
});

const getProjectDatabases = (projectID, params) => (dispatch) => {
  dispatch(startFetchingDatabases());

  return axios.post(`/projects/${projectID}/databases`, params)
    .then((response) => {
      dispatch(getDatabasesSuccess(projectID, response));
    })
    .catch((error) => {
      dispatch(getDatabasesFailed(projectID, error));
    });
};


export default getProjectDatabases;
export { clearProjectDatabases };
