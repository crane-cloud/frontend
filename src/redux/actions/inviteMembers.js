import axios from "../../axios";
import {
  INVITE_MEMBERS_SUCCESS,
  INVITE_MEMBERS_FAILED,
  START_INVITING_MEMBERS,
  CLEAR_INVITING_MEMBERS_STATE,
} from "./actionTypes";

const startInvitingMembers = () => ({
  type: START_INVITING_MEMBERS,
});

const inviteMembersSuccess = (response) => ({
  type: INVITE_MEMBERS_SUCCESS,
  payload: response.data.data,
});

const inviteMembersFailed = (error) => ({
  type: INVITE_MEMBERS_FAILED,
  payload: {
    status: false,
    error: error,
  },
});

const clearInvitingMembersState = () => ({
  type: CLEAR_INVITING_MEMBERS_STATE,
});

const inviteMembers = (inviteInfo, ProjectID) => (dispatch) => {
  dispatch(startInvitingMembers());

  return axios
    .post(`/projects/${ProjectID}/users`, inviteInfo)
    .then((response) => dispatch(inviteMembersSuccess(response)))
    .catch((error) => {
      dispatch(inviteMembersFailed(error));
    });
};

export { clearInvitingMembersState };

export default inviteMembers;
