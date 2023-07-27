import axios from "../../axios";
import {
  GET_INACTIVE_USERS_FAILED,
  GET_INACTIVE_USERS_SUCCESS,
  GETTING_INACTIVE_USERS,
} from "./actionTypes";

const startFetchingInactiveUsers = () => ({
  type: GETTING_INACTIVE_USERS,
});

const getInactiveUsersSuccess = (response) => ({
  type: GET_INACTIVE_USERS_SUCCESS,
  payload: response.data.data,
});

const getInactiveUsersFailed = (error) => ({
  type: GET_INACTIVE_USERS_FAILED,
  payload: {
    status: false,
    error: error,
  },
});

const adminGetInactiveUsers = (page, selectedDateRange) => (dispatch) => {
  dispatch(startFetchingInactiveUsers());

  return axios
    .get(`/users/inactive_users?range=${selectedDateRange}&page=${page}`)
    .then((response) => {
      dispatch(getInactiveUsersSuccess(response));
    })
    .catch((error) => {
      dispatch(getInactiveUsersFailed(error));
    });
};

export default adminGetInactiveUsers;
