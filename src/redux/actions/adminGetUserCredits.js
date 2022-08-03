import axios from "../../axios";
import {
  ADMIN_GET_USER_CREDITS_FAIL,
  ADMIN_GET_USER_CREDITS_SUCCESS,
  ADMIN_GETTING_USER_CREDITS,
  // ADMIN_CLEAR_USER_CREDITS,
} from "./actionTypes";

export const startFetchingUserCredit = () => ({
  type: ADMIN_GETTING_USER_CREDITS,
});

export const getUserCreditsSuccess = (response) => ({
  type: ADMIN_GET_USER_CREDITS_SUCCESS,
  payload: response.data.data,
});

export const getUserCreditsFail = (error) => ({
  type: ADMIN_GET_USER_CREDITS_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const adminGetUserCredits = (userID) => (dispatch) => {
  dispatch(startFetchingUserCredit());

  return axios
    .get(`/credit_assignment/${userID}`)

    .then((response) => dispatch(getUserCreditsSuccess(response)))
    .catch((error) => {
      dispatch(getUserCreditsFail(error));
    });
};

export default adminGetUserCredits;
