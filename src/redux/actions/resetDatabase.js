import axios from '../../axios';
import {
  RESET_DATABASE_SUCCESS,
  RESET_DATABASE_FAIL,
  START_RESETING_DATABASE,
  CLEAR_RESET_DATABASE_STATE
} from './actionTypes';

const startResetingDatabase = () => ({
  type: START_RESETING_DATABASE,
});

const resetDatabaseSuccess = (response) => ({
  type: RESET_DATABASE_SUCCESS,
  payload: response.data.data,
});

const resetDatabaseFail = (error) => ({
  type: RESET_DATABASE_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const clearDatabaseResetState = () => ({
  type: CLEAR_RESET_DATABASE_STATE
});

const resetDatabase = (projectID, databaseID) => (dispatch) => {
  dispatch(startResetingDatabase());

  return axios.post(`/projects/${projectID}/databases/${databaseID}/reset`)
    .then((response) => dispatch(resetDatabaseSuccess(response)))
    .catch((error) => {
      dispatch(resetDatabaseFail(error));
    });
};

export default resetDatabase;
export { clearDatabaseResetState };
