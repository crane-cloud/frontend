import axios from "../../axios";
import {
  DISABLE_USER_SUCCESS,
  DISABLING_USER,
  DISABLE_USER_FAIL
} from "./actionTypes";

const startDisablingUser = () => ({
  type: DISABLING_USER,
});

const disableUserSuccess = (response) => ({
  type: DISABLE_USER_SUCCESS,
  payload: response.data,
});

const disableUserFail = (error) => ({
  type: DISABLE_USER_FAIL,
  payload: {
    error: error.response,
  },
});

const disableUser = (userID) => (dispatch) => {
  dispatch(startDisablingUser());

  return axios
    .post(`/users/${userID}/disable`)
    .then((response) => dispatch(disableUserSuccess(response)))
    .catch((error) => {
      dispatch(disableUserFail(error));
    });
};

export default disableUser;
