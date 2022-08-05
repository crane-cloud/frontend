import axios from "../../axios";
import {
  CREDITS_PAYMENT_SUCCESS,
  CREDITS_PAYMENT_FAIL,
  START_CREDITS_PAYMENT,
  CLEAR_CREDITS_PAYMENT_STATE
} from "./actionTypes";

export const startTheFetch = () => ({
  type: START_CREDITS_PAYMENT,
});

export const creditsPaymentSuccess = (response) => ({
  type: CREDITS_PAYMENT_SUCCESS,
  payload: response.data,
});

export const creditsPaymentFailed = (error) => ({
  type: CREDITS_PAYMENT_FAIL,
  payload: {
    status: false,
    error: error,
  },
});

export const clearCreditsTransactions = () => ({
    type: CLEAR_CREDITS_PAYMENT_STATE,
  });

export const creditsPayment = (paymentData, projectID) => (dispatch) => {
  dispatch(startTheFetch());
  return axios
    .post(`/projects/${projectID}/credit_transactions`, paymentData)
    .then((response) => dispatch(creditsPaymentSuccess(response)))
    .catch((error) => {
      dispatch(creditsPaymentFailed(error));
    });
};

export default creditsPayment;
