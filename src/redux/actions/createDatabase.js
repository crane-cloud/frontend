import axios from "../../axios";
import {
  CREATE_DATABASE_SUCCESS,
  CLEAR_ADD_DATABASE_STATE,
  CREATE_DATABASE_FAIL,
  START_CREATING_DATABASE,
} from "./actionTypes";

const startCreatingDatabase = () => ({
  type: START_CREATING_DATABASE,
});

const createDatabaseSuccess = (response) => ({
  type: CREATE_DATABASE_SUCCESS,
  payload: response.data.data,
});

const createDatabaseFail = (error) => ({
  type: CREATE_DATABASE_FAIL,
  payload: {
    status: false,
    error: error.status,
    errorCode: error.response.status,
  },
});

const clearDatabaseCreateState = () => ({
  type: CLEAR_ADD_DATABASE_STATE,
});

const createDatabase = (databaseInfo, projectID) => (dispatch) => {
  dispatch(startCreatingDatabase());

  return axios
    .post(`/projects/${projectID}/databases`, databaseInfo)
    .then((response) => dispatch(createDatabaseSuccess(response)))
    .catch((error) => {
      dispatch(createDatabaseFail(error));
    });
};

export default createDatabase;
export { clearDatabaseCreateState };
