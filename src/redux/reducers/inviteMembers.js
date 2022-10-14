import {
  INVITE_MEMBERS_SUCCESS,
  INVITE_MEMBERS_FAILED,
  START_INVITING_MEMBERS,
  CLEAR_INVITING_MEMBERS_STATE,
} from "../actions/actionTypes";

const initialState = {
  invitation: null,
  isSent: false,
  isSending: false,
  message: "",
};

const inviteMembersReducer = (state = initialState, action) => {
  switch (action.type) {
    case INVITE_MEMBERS_SUCCESS:
      return {
        ...state,
        invitation: action.payload,
        isSending: false,
        isSent: true,
        message: "Invitation has been sent successfully",
      };

    case START_INVITING_MEMBERS:
      return {
        ...state,
        isSending: true,
        isSent: false,
      };

    case INVITE_MEMBERS_FAILED:
      return {
        ...state,
        message: action.payload,
        isSending: false,
        isSent: false,
      };

    case CLEAR_INVITING_MEMBERS_STATE:
      return {
        ...state,
        invitation: null,
        isSent: false,
        isSending: false,
        message: "",
      };

    default:
      return state;
  }
};

export default inviteMembersReducer;
