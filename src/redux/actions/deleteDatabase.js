import axios from '../../axios';
import {
  DELETE_DATABASE_SUCCESS,
  DELETE_DATABASE_FAIL,
  START_DELETING_DATABASE,
  CLEAR_DELETE_DATABASE_STATE
} from './actionTypes';

const startDeletingDatabase = () => ({
  type: START_DELETING_DATABASE,
});

const deleteDatabaseSuccess = (response) => ({
  type: DELETE_DATABASE_SUCCESS,
  payload: response.data.data,
});

const deleteDatabaseFail = (error) => ({
  type: DELETE_DATABASE_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const clearDeleteDatabaseState = () => ({
  type: CLEAR_DELETE_DATABASE_STATE
});

const deleteDatabase = (projectID, databaseID) => (dispatch) => {
  dispatch(startDeletingDatabase());

  return axios.delete(`/projects/${projectID}/databases/${databaseID}`)
    .then((response) => dispatch(deleteDatabaseSuccess(response)))
    .catch((error) => {
      dispatch(deleteDatabaseFail(error));
    });
};

export default deleteDatabase;
export { clearDeleteDatabaseState };
