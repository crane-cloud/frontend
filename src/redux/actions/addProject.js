import axios from 'axios';
import { API_BASE_URL } from '../../config';
import {
  START_ADDING_PROJECT,
  CLEAR_ADD_PROJECT_STATE,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAILED
} from './actionTypes';


const startPostingProject = () => ({
  type: START_ADDING_PROJECT,
});

export const addProjectSuccess = (response) => ({
  type: ADD_PROJECT_SUCCESS,
  payload: response.data,
});

export const addProjectFail = (error) => ({
  type: ADD_PROJECT_FAILED,
  payload: {
    error: error.response.status,
  },
});


const clearState = () => ({
  type: CLEAR_ADD_PROJECT_STATE
});

const AddProject = (projectData) => (dispatch) => {
  dispatch(startPostingProject());

  return axios.post(`${API_BASE_URL}/projects`, projectData,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then((response) => dispatch(addProjectSuccess(response)))
    .catch((error) => {
      dispatch(addProjectFail(error));
    });
};
export { clearState };

export default AddProject;
