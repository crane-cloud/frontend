import axios from "../../axios";
import {
    ADMIN_GETTING_ALL_DATABASES,
    ADMIN_ALL_DATABASES_SUCCESS,
    ADMIN_ALL_DATABASES_FAIL,
} from "./actionTypes";

const startFetchingDatabases = () => ({
  type: ADMIN_GETTING_ALL_DATABASES,
});

const adminGetDatabasesSuccess = (response) => ({
  type: ADMIN_ALL_DATABASES_SUCCESS,
  payload: response.data.data,
});

const adminGetDatabasesFailed = (error) => ({
  type: ADMIN_ALL_DATABASES_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const adminGetDatabases = (page) => (dispatch) => {
  dispatch(startFetchingDatabases());

  return axios
    .get(`/databases?page=${page}`)
    .then((response) => {
      dispatch(adminGetDatabasesSuccess(response));
    })
    .catch((error) => {
      dispatch(adminGetDatabasesFailed(error));
    });
};

export default adminGetDatabases;