import axios from "../../axios";
import {
    GETTING_SINGLE_DATABASE,
    SINGLE_DATABASE_FAIL,
    SINGLE_DATABASE_SUCCESS
} from "./actionTypes";

export const startTheFetch = () => ({
  type: GETTING_SINGLE_DATABASE,
});

export const getSingleDBSuccess = (response) => ({
  type: SINGLE_DATABASE_SUCCESS,
  payload: response.data.data,
});

export const getSingleDBFailed = (error) => ({
  type: SINGLE_DATABASE_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const getSingleDB = (projectID, databaseID) => (dispatch) => {
  dispatch(startTheFetch());
  return axios
    .get(`/projects/${projectID}/databases/${databaseID}`)
    .then((response) => dispatch(getSingleDBSuccess(response)))
    .catch((error) => {
      dispatch(getSingleDBFailed(error));
    });
};

export default getSingleDB;
