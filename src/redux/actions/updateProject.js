import axios from 'axios';
import { API_BASE_URL } from '../../config';
import {
  START_UPDATING_PROJECT,
  CLEAR_UPDATE_PROJECT_STATE,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILED
} from './actionTypes';


const startUpdatingProject = () => ({
  type: START_UPDATING_PROJECT,
});

export const updateProjectSuccess = (response) => ({
  type: UPDATE_PROJECT_SUCCESS,
  payload: response.data,
});

export const updateProjectFail = (error) => ({
  type: UPDATE_PROJECT_FAILED,
  payload: {
    status: false,
    errorCode: error.response.status,
  },
});


const clearUpdateProjectState = () => ({
  type: CLEAR_UPDATE_PROJECT_STATE
});

const updateProject = (projectID, projectData) => (dispatch) => {
  dispatch(startUpdatingProject());

  return axios.patch(`${API_BASE_URL}/projects/${projectID}`, projectData,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then((response) => dispatch(updateProjectSuccess(response)))
    .catch((error) => {
      dispatch(updateProjectFail(error));
    });
};
export { clearUpdateProjectState };

export default updateProject;
