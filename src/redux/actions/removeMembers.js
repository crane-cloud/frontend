import axios from "../../axios";
import {
  REMOVE_MEMBER_SUCCESS,
  REMOVE_MEMBER_FAIL,
  START_REMOVING_MEMBER,
} from "./actionTypes";

const startRemovingProjectMember = () => ({
  type: START_REMOVING_MEMBER,
});

const removeProjectMemberSuccess = (response) => ({
  type: REMOVE_MEMBER_SUCCESS,
  payload: Response.data.data,
});

const removeProjectMemberFail = (error) => ({
  type: REMOVE_MEMBER_FAIL,
  payload: {
    status: false,
    error: error,
  },
});

const removeMember = (email, ProjectID) => (dispatch) => {
  dispatch(startRemovingProjectMember());

  return axios
    .delete(`/projects/${ProjectID}/users`, email)
    .then((response) => dispatch(removeProjectMemberSuccess(response)))
    .catch((error) => {
      dispatch(removeProjectMemberFail(error));
    });
};

export default removeMember;
