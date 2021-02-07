import axios from '../../axios';
import redirectToLogin from '../../helpers/redirectToLogin';
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
    status: false,
    errorCode: error.response.status,
  },
});


const clearAddProjectState = () => ({
  type: CLEAR_ADD_PROJECT_STATE
});

const addProject = (projectData) => (dispatch) => {
  dispatch(startPostingProject());

  return axios.post(`/projects`, projectData)
    .then((response) => dispatch(addProjectSuccess(response)))
    .catch((error) => {
      if (error.response.status === 401) {
        // function to logout user and redirect user to login
        
        redirectToLogin(dispatch);
      }
      dispatch(addProjectFail(error));
    });
};
export { clearAddProjectState };

export default addProject;
