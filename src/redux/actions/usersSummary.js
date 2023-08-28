import axios from "../../axios";
import {
  GETTING_USERS_SUMMARY,
  USERS_SUMMARY_SUCCESS,
  USERS_SUMMARY_FAIL,
} from "./actionTypes";

export const startFetchingUsersSummary = () => ({
  type: GETTING_USERS_SUMMARY,
});

export const getUsersSuccessSummary = (response) => ({
  type: USERS_SUMMARY_SUCCESS,
  payload: response.data.data,
});

export const getUsersFailSummary = (error) => ({
  type: USERS_SUMMARY_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const userSummary = (details) => (dispatch) => {
  dispatch(startFetchingUsersSummary());
  
  return axios
    .get(`/users/graph?start=${details.begin}&&end=${details.end}&&set_by=${details.set_by}`)
    .then((response) => dispatch(getUsersSuccessSummary(response)))
    .catch((error) => {
      dispatch(getUsersFailSummary(error));
    });
};

export default userSummary;
