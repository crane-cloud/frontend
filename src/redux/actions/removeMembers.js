import axios from "../../axios";
import {
  REMOVE_MEMBER_SUCCESS,
  REMOVE_MEMBER_FAIL,
  START_REMOVING_MEMBER,
  CLEAR_REMOVE_MEMBERS_STATE,
} from "./actionTypes";

const startRemovingProjectMember = () => ({
  type: START_REMOVING_MEMBER,
});

const removeProjectMemberSuccess = (response) => ({
  type: REMOVE_MEMBER_SUCCESS,
  payload: response.data.data,
});

const removeProjectMemberFail = (error) => ({
  type: REMOVE_MEMBER_FAIL,
  payload: {
    status: false,
    error: error,
  },
});

const clearRemovingMembersState = () => ({
  type: CLEAR_REMOVE_MEMBERS_STATE,
});

const removeMember = (email, ProjectID) => (dispatch) => {
  dispatch(startRemovingProjectMember());
  console.log("banaye");

  return axios
    .delete(`/projects/${ProjectID}/users`, email)
    .then((response) => dispatch(removeProjectMemberSuccess(response)))
    .catch((error) => {
      dispatch(removeProjectMemberFail(error));
    });
};

export { clearRemovingMembersState };

export default removeMember;
