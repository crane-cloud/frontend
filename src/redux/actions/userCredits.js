import axios from "../../axios";
import {
  GETTING_USER_CREDITS,
  GET_USER_CREDITS_FAIL,
  GET_USER_CREDITS_SUCCESS,
} from "./actionTypes";

export const startFetchingUserCredit = () => ({
  type: GETTING_USER_CREDITS,
});

export const getUserCreditsSuccess = (response) => ({
  type: GET_USER_CREDITS_SUCCESS,
  payload: response.data.data.credit,
});

export const getUserCreditsFail = (error) => ({
  type: GET_USER_CREDITS_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const getUserCredits = (userID) => (dispatch) => {
  dispatch(startFetchingUserCredit());

  return axios
    .get(`/credit/${userID}`)

    .then((response) => dispatch(getUserCreditsSuccess(response)))
    .catch((error) => {
      dispatch(getUserCreditsFail(error));
    });
};

export default getUserCredits;
