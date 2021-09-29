import axios from "../../axios";
import {
    GETTING_ALL_DATABASES,
    ALL_DATABASES_SUCCESS,
    ALL_DATABASES_FAIL,
} from "./actionTypes";

const startFetchingDatabases = () => ({
  type: GETTING_ALL_DATABASES,
});

const getDatabasesSuccess = (response) => ({
  type: ALL_DATABASES_SUCCESS,
  payload: response.data.data.databases,
});

const getDatabasesFailed = (error) => ({
  type: ALL_DATABASES_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const getDatabases = () => (dispatch) => {
  dispatch(startFetchingDatabases());

  return axios
    .get(`/databases/stats`)
    .then((response) => {
      dispatch(getDatabasesSuccess(response));
    })
    .catch((error) => {
      dispatch(getDatabasesFailed(error));
    });
};

export default getDatabases;
