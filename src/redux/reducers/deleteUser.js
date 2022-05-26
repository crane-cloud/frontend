import {
  DELETING_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../actions/actionTypes";

const initialState = {
  user: null,
  isDeleted: false,
  isDeleting: false,
  message: "",
  deleteFailed: false,
};

const deleteUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETING_USER:
      return {
        ...state,
        isDeleting: true,
        isDeleted: false,
        deleteFailed: false,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isDeleting: false,
        isDeleted: true,
        deleteFailed: false,
        message: "User has been Deleted.",
      };

    case DELETE_USER_FAIL:
      return {
        ...state,
        message: "Failed to delete user. Please try again.",
        isDeleting: false,
        isDeleted: false,
        deleteFailed: true,
      };

    // case CLEAR_DELETE_PROJECT_STATE:
    //   return {
    //     ...state,
    //     isDeleted: false,
    //     isDeleting: false,
    //     deleteFailed: false,
    //     message: "",
    //   };

    default:
      return state;
  }
};

export default deleteUserReducer;
