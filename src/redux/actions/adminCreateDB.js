import axios from "../../axios";
import {
  ADMIN_CREATE_DATABASE_SUCCESS,
  ADMIN_CLEAR_ADD_DATABASE_STATE,
  ADMIN_CREATE_DATABASE_FAIL,
  ADMIN_START_CREATING_DATABASE,
} from "./actionTypes";

const startCreatingDatabase = () => ({
  type: ADMIN_START_CREATING_DATABASE,
});

const adminCreateDBSuccess = (response) => ({
  type: ADMIN_CREATE_DATABASE_SUCCESS,
  payload: response.data.data,
});

const adminCreateDBFail = (error) => ({
  type: ADMIN_CREATE_DATABASE_FAIL,
  payload: {
    status: false,
    error: error.status,
    errorCode: error.response.status,
  },
});

const clearAdminCreateDBState = () => ({
  type: ADMIN_CLEAR_ADD_DATABASE_STATE,
});

const createAdminDB = (databaseInfo) => (dispatch) => {
  dispatch(startCreatingDatabase());

  return axios
    .post(`/databases`, databaseInfo)
    .then((response) => dispatch(adminCreateDBSuccess(response)))
    .catch((error) => {
      dispatch(adminCreateDBFail(error));
    });
};

export default createAdminDB;
export { clearAdminCreateDBState };
