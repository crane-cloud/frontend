import axios from "../../axios";
import {
  START_UPDATING_DATABASE_PASSWORD,
  CLEAR_UPDATE_DATABASE_PASSWORD_STATE,
  UPDATE_DATABASE_PASSWORD_SUCCESS,
  UPDATE_DATABASE_PASSWORD_FAILED,
} from "./actionTypes";

const startUpdatingProject = () => ({
  type: START_UPDATING_DATABASE_PASSWORD,
});

export const updateDatabasePasswordSuccess = (response) => ({
  type: UPDATE_DATABASE_PASSWORD_SUCCESS,
  payload: response.data,
});

export const updateDatabasePasswordFail = (error) => ({
  type: UPDATE_DATABASE_PASSWORD_FAILED,
  payload: {
    status: false,
    errorCode: error.response.status,
  },
});

const clearUpdateDatabasePasswordState = () => ({
  type: CLEAR_UPDATE_DATABASE_PASSWORD_STATE,
});

const updateDatabasePassword =
  (projectID, databaseID, newDBPassword) => (dispatch) => {
    dispatch(startUpdatingProject());

    return axios
      .post(
        `/projects/${projectID}/databases/${databaseID}/reset_password`,
        newDBPassword
      )
      .then((response) => dispatch(updateDatabasePasswordSuccess(response)))
      .catch((error) => {
        dispatch(updateDatabasePasswordFail(error));
      });
  };
export { clearUpdateDatabasePasswordState };

export default updateDatabasePassword;
