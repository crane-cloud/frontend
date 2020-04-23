import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { GET_PROJECT_DETAIL_SUCCESS, GET_PROJECT_DETAIL_FAIL, START_GETTING_PROJECT_DETAIL } from './actionTypes';

export const startGettingProjectDetail = () => ({
  type: START_GETTING_PROJECT_DETAIL,
});

export const getProjectDetailSuccess = (response) => (
  {
    type: GET_PROJECT_DETAIL_SUCCESS,
    payload: response.data.data.project,
  });

export const getProjectDetailFail = (error) => ({
  type: GET_PROJECT_DETAIL_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const getProjectDetail = (projectID) => (dispatch) => {
  dispatch(startGettingProjectDetail());
  return axios.get(`${API_BASE_URL}/projects/${projectID}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then((response) => dispatch(getProjectDetailSuccess(response)))
    .catch((error) => {
      dispatch(getProjectDetailFail(error));
    });
};

export default getProjectDetail;
