import {
    ADDING_USER_CREDITS,
    ADD_BETA_USER_CREDITS_SUCCESS,
    ADD_BETA_USER_CREDITS_FAIL,
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
  
      default:
        return state;
    }
  };
  
  export default addUserCreditsReducer;
  