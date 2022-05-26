import axios from "../../axios";
import {
  ADDING_BETA_USER,
  ADD_BETA_USER_SUCCESS,
  ADD_BETA_USER_FAIL,
} from "./actionTypes";

const startAddingBetaUser = () => ({
  type: ADDING_BETA_USER,
});

const addBetaUserSuccess = (response) => ({
  type: ADD_BETA_USER_SUCCESS,
  payload: response.data,
});

const addBetaUserFail = (error) => ({
  type: ADD_BETA_USER_FAIL,
  payload: {
    error: error.response,
  },
});

const addBetaUser = (userData) => (dispatch) => {
  dispatch(startAddingBetaUser());

  return axios
    .patch(`/users/admin_update`, userData)
    .then((response) => dispatch(addBetaUserSuccess(response)))
    .catch((error) => {
      dispatch(addBetaUserFail(error));
    });
};

export default addBetaUser;
