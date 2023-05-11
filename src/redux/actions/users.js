import axios from "../../axios";
import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  START_GETTING_USERS,
} from "./actionTypes";

export const startGettingUsers = () => ({
  type: START_GETTING_USERS,
});

export const getUsersSuccess = (response) => ({
  type: GET_USERS_SUCCESS,
  payload: response.data.data,
});

export const getUsersFail = (error) => ({
  type: GET_USERS_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const getUsersList = (page) => async (dispatch) => {
  dispatch(startGettingUsers());
  try {
    const response = await axios.get(`/users?page=${page}`);
    return dispatch(getUsersSuccess(response));
  } catch (error) {
    dispatch(getUsersFail(error));
  }
};

export default getUsersList;
