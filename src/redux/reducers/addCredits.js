import {
  ADDING_USER_CREDITS,
  ADD_BETA_USER_CREDITS_SUCCESS,
  ADD_BETA_USER_CREDITS_FAIL,
  CLEAR_ADD_BETA_USER_CREDITS_STATE,
} from "../actions/actionTypes";

const initialState = {
  Added: false,
  Failed: false,
  Adding: false,
  error: null,
  message: "",
};

const addUserCreditsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BETA_USER_CREDITS_SUCCESS:
      return {
        ...state,
        Adding: false,
        Failed: false,
        Added: true,
        message: "User credits added Successfully",
      };

    case ADDING_USER_CREDITS:
      return {
        ...state,
        Adding: true,
        Added: false,
      };

    case ADD_BETA_USER_CREDITS_FAIL:
      return {
        ...state,
        Failed: true,
        Added: false,
        Adding: false,
        error: action.payload.error,
        message: "Failed to add user credits",
      };

    case CLEAR_ADD_BETA_USER_CREDITS_STATE:
      return {
        ...state,
        Added: false,
        Failed: false,
        Adding: false,
        error: null,
        message: "",
      };

    default:
      return state;
  }
};

export default addUserCreditsReducer;
