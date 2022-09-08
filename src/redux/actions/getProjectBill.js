import axios from "../../axios";
import {
  GETTING_PROJECT_BILLING_INFO,
  PROJECT_BILLING_INFO_SUCCESS,
  PROJECT_BILLING_INFO_FAIL,
} from "./actionTypes";

const startFetchingBill = () => ({
  type: GETTING_PROJECT_BILLING_INFO,
});

const getProjectBillSuccess = (response) => ({
  type: PROJECT_BILLING_INFO_SUCCESS,
  payload: response.data.data,
});

const getProjectBillFailed = (error) => ({
  type: PROJECT_BILLING_INFO_FAIL,
  payload: {
    status: false,
    error: error,
  },
});

const getProjectBill = (projectID, billObj) => (dispatch) => {
  dispatch(startFetchingBill());

  return axios
    .post(`/projects/${projectID}/billing/info`, billObj)
    .then((response) => {
      dispatch(getProjectBillSuccess(response));
    })
    .catch((error) => {
      dispatch(getProjectBillFailed(error));
    });
};

export default getProjectBill;