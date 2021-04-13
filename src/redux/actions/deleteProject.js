import axios from '../../axios';
import {
  DELETE_PROJECT_SUCCESS, DELETE_PROJECT_FAIL, START_DELETING_PROJECT, CLEAR_DELETE_PROJECT_STATE 
} from './actionTypes';

const startDeletingProject = () => ({
  type: START_DELETING_PROJECT,
});

const deleteProjectSuccess = (response) => ({
  type: DELETE_PROJECT_SUCCESS,
  payload: response.data.data,
});

const deleteProjectFail = (error) => ({
  type: DELETE_PROJECT_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const clearDeleteProjectState = () => ({
  type: CLEAR_DELETE_PROJECT_STATE
});

const deleteProject = (ProjectID) => (dispatch) => {
  dispatch(startDeletingProject());

  return axios.delete(`/projects/${ProjectID}`)
    .then((response) => dispatch(deleteProjectSuccess(response)))
    .catch((error) => {
      dispatch(deleteProjectFail(error));
    });
};

export { clearDeleteProjectState };

export default deleteProject;
