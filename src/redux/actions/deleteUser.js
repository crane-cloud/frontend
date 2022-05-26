import axios from "../../axios";
import {
  DELETING_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "./actionTypes";

const startDeletingUser = () => ({
  type: DELETING_USER,
});

const deleteUserSuccess = (response) => ({
  type: DELETE_USER_SUCCESS,
  payload: response.data,
});

const deleteUserFail = (error) => ({
  type: DELETE_USER_FAIL,
  payload: {
    status: false,
    error: error,
  },
});

// const clearDeleteUserState = () => ({
//   type: CLEAR_DELETE_PROJECT_STATE,
// });

const deleteUser = (UserID) => (dispatch) => {
  dispatch(startDeletingUser());

  return axios
    .delete(`/users/${UserID}`)
    .then((response) => dispatch(deleteUserSuccess(response)))
    .catch((error) => {
      dispatch(deleteUserFail(error));
    });
};
// export { clearDeleteUserState };

export default deleteUser;
