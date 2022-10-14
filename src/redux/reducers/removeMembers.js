import {
  REMOVE_MEMBER_SUCCESS,
  REMOVE_MEMBER_FAIL,
  START_REMOVING_MEMBER,
} from "../actions/actionTypes";

const initialState = {
  member: null,
  isRemoved: false,
  isRemoving: false,
  message: "",
  isFailed: false,
};

const removeMemberReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_REMOVING_MEMBER:
      return {
        ...state,
        isRemoving: true,
        isRemoved: false,
        isFailed: false,
      };

    case REMOVE_MEMBER_SUCCESS:
      return {
        ...state,
        member: action.payload,
        isRemoving: false,
        isRemoved: true,
        isFailed: false,
        message: "Project member has been removed.",
      };

    case REMOVE_MEMBER_FAIL:
      return {
        ...state,
        message: "Failed to remove project member. Please try again.",
        isRemoving: false,
        isRemoved: false,
        isFailed: true,
      };

    default:
      return state;
  }
};

export default removeMemberReducer;
