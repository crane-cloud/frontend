import axios from "../../axios";
import {
  GETTING_PASSWORD,
  PASSWORD_FAIL,
  PASSWORD_SUCCESS,
  CLEAR_FETCH_PASSWORD,
} from "./actionTypes";

export const startTheFetch = () => ({
  type: GETTING_PASSWORD,
});

export const getPasswordSuccess = (response) => ({
  type: PASSWORD_SUCCESS,
  payload: response.data.data.password,
});

export const getPasswordFailed = (error) => ({
  type: PASSWORD_FAIL,
  payload: error.status,
});

const clearFetchDBPassword = () => ({
  type: CLEAR_FETCH_PASSWORD,
});

const getPassword = (projectID, databaseID) => (dispatch) => {
  dispatch(startTheFetch());
  return axios
    .get(`/projects/${projectID}/databases/${databaseID}/password`)
    .then((response) => dispatch(getPasswordSuccess(response)))
    .catch((error) => {
      dispatch(getPasswordFailed(error));
    });
};

export { clearFetchDBPassword };
export default getPassword;
