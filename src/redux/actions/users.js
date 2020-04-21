import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { GET_USERS_SUCCESS, GET_USERS_FAIL, START_GETTING_USERS } from './actionTypes';

export const startGettingUsers = () => ({
  type: START_GETTING_USERS,
});

export const getUsersSuccess = (response) => (
  {
    type: GET_USERS_SUCCESS,
    payload: response.data.data.users,
  });

export const getUsersFail = (error) => ({
  type: GET_USERS_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const getUsersList = () => async (dispatch) => {
  dispatch(startGettingUsers());
  try {
    const response = await axios.get(`${API_BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return dispatch(getUsersSuccess(response));
  } catch (error) {
    dispatch(getUsersFail(error));
  }
};

export default getUsersList;
