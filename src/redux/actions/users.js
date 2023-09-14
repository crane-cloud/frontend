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
 
const getUsersList = (sectionValue, page, keywords) => async (dispatch) => {
  dispatch(startGettingUsers());
 
  let link;
  if (sectionValue !== "all") {
    if (sectionValue === "verified") {
      link = `/users?page=${page}&verified=true`;
    } else if (sectionValue === "unverified") {
      link = `/users?page=${page}&verified=false`;
    } else {
      link = `/users?page=${page}&is_beta=true`;
    }
  } else {
    link = `/users?page=${page}`;
  }
 
  if (keywords) {
    link += `&keywords=${keywords}`;
  }
 
  console.log(link);
 
  try {
    const response = await axios.get(link);
    dispatch(getUsersSuccess(response));
  } catch (error) {
    dispatch(getUsersFail(error));
  }
};
 
export default getUsersList;
 
