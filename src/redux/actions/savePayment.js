import axios from "../../axios";
import {
  SAVE_PAYMENT_SUCCESS,
  SAVE_PAYMENT_FAIL,
  START_SAVING_PAYMENT,
} from "./actionTypes";

export const startTheFetch = () => ({
  type: START_SAVING_PAYMENT,
});

export const savePaymentSuccess = (response) => ({
  type: SAVE_PAYMENT_SUCCESS,
  payload: response.data,
});

export const savePaymentFailed = (error) => ({
  type: SAVE_PAYMENT_FAIL,
  payload: {
    status: false,
    error: error,
  },
});

const savePayment = (paymentData, projectID) => (dispatch) => {
  dispatch(startTheFetch());
  return axios
    .post(`/projects/${projectID}/transactions`, paymentData)
    .then((response) => dispatch(savePaymentSuccess(response)))
    .catch((error) => {
      dispatch(savePaymentFailed(error));
    });
};

export default savePayment;
