import axios from "../../axios";
import {
  GET_PROJECT_MEMBERS_SUCCESS,
  GET_PROJECT_MEMBERS_FAILED,
  START_GETTING_PROJECT_MEMBERS,
  CLEAR_GET_PROJECT_MEMBERS_STATE,
} from "./actionTypes";

const startGettingProjectMembers = () => ({
  type: START_GETTING_PROJECT_MEMBERS,
});

const getProjectMembersSuccess = (response) => ({
  type: GET_PROJECT_MEMBERS_SUCCESS,
  payload: response.data,
});

const getProjectMembersFail = (error) => ({
  type: GET_PROJECT_MEMBERS_FAILED,
  payload: {
    status: false,
    error: error,
  },
});

const clearGetProjectMembersState = () => ({
  type: CLEAR_GET_PROJECT_MEMBERS_STATE,
});

const getProjectMembers = (ProjectID) => (dispatch) => {
  dispatch(startGettingProjectMembers());

  return axios
    .get(`/projects/${ProjectID}/users`)
    .then((response) => dispatch(getProjectMembersSuccess(response)))
    .catch((error) => {
      dispatch(getProjectMembersFail(error));
    });
};

export { clearGetProjectMembersState };

export default getProjectMembers;
