import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { GET_USER_DETAIL_SUCCESS, GET_USER_DETAIL_FAIL, START_GETTING_USER_DETAIL } from './actionTypes';

export const startGettingUserDetail = () => ({
  type: START_GETTING_USER_DETAIL,
});

export const getUserDetailSuccess = (response) => (
  {
    type: GET_USER_DETAIL_SUCCESS,
    payload: response.data.data.user,
  });

export const getUserDetailFail = (error) => ({
  type: GET_USER_DETAIL_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const getUserDetail = (userID) => (dispatch) => {
  dispatch(startGettingUserDetail());
  return axios.get(`${API_BASE_URL}/users/${userID}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then((response) => dispatch(getUserDetailSuccess(response)))
    .catch((error) => {
      dispatch(getUserDetailFail(error));
    });
};

export default getUserDetail;
