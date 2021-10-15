import axios from "../../axios";
import {
  GETTING_APPS_SUMMARY,
  APPS_SUMMARY_SUCCESS,
  APPS_SUMMARY_FAIL,
} from "./actionTypes";

export const startFetchingAppsSummary = () => ({
  type: GETTING_APPS_SUMMARY,
});

export const getAppsSuccessSummary = (response) => ({
  type: APPS_SUMMARY_SUCCESS,
  payload: response.data.data,
});

export const getAppsFailSummary = (error) => ({
  type: APPS_SUMMARY_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const appSummary = (details) => (dispatch) => {
  dispatch(startFetchingAppsSummary());

  return axios
    .post(`/apps/summary`, details)

    .then((response) => dispatch(getAppsSuccessSummary(response)))
    .catch((error) => {
      dispatch(getAppsFailSummary(error));
    });
};

export default appSummary;
