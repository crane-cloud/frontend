import axios from "../../axios";
import {
    GETTING_SINGLE_APP,
    SINGLE_APP_FAIL,
    SINGLE_APP_SUCCESS
} from "./actionTypes";

export const startTheFetch = () => ({
  type: GETTING_SINGLE_APP,
});

export const getSingleAppSuccess = (response) => ({
  type: SINGLE_APP_SUCCESS,
  payload: response.data.data.app,
});

export const getSingleAppFailed = (error) => ({
  type: SINGLE_APP_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const getSingleApp = (projectID, appID) => (dispatch) => {
  dispatch(startTheFetch());
  return axios
    .get(`/projects/${projectID}/databases/${appID}`)
    .then((response) => dispatch(getSingleAppSuccess(response)))
    .catch((error) => {
      dispatch(getSingleAppFailed(error));
    });
};

export default getSingleApp;
