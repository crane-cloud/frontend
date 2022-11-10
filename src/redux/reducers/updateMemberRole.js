import {
  UPDATE_MEMBER_ROLE_SUCCESS,
  UPDATE_MEMBER_ROLE_FAIL,
  START_UPDATING_MEMBER_ROLE,
  CLEAR_UPDATE_MEMBER_ROLE_STATE,
} from "../actions/actionTypes";

const initialState = {
  isRoleUpdated: false,
  isRoleUpdating: false,
  isRoleUpdateFailed: false,
  updateMessage: "",
};

const updateMemberRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MEMBER_ROLE_SUCCESS: {
      return {
        ...state,
        role: action.payload,
        isRoleUpdated: true,
        isRoleUpdating: false,
        isRoleUpdateFailed: false,
      };
    }
    case START_UPDATING_MEMBER_ROLE: {
      return {
        ...state,
        isRoleUpdated: false,
        isRoleUpdating: true,
        isRoleUpdateFailed: false,
      };
    }
    case UPDATE_MEMBER_ROLE_FAIL: {
      return {
        ...state,
        isRoleUpdated: false,
        isRoleUpdating: false,
        isRoleUpdateFailed: true,
        updateMessage: "Failed to update member role.",
      };
    }
    case CLEAR_UPDATE_MEMBER_ROLE_STATE: {
      return {
        ...state,
        isRoleUpdated: false,
        isRoleUpdating: false,
        isRoleUpdateFailed: false,
        updateMessage: "",
      };
    }
    default:
      return state;
  }
};

export default updateMemberRoleReducer;
