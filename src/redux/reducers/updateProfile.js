import {
    START_UPDATING_PROFILE,
    CLEAR_UPDATE_PROFILE_STATE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
  } from "../actions/actionTypes";
  const initialState = {
    profileUpdated: false,
    profileUpdating: false,
    errorMessage: "",
  };
  
  const updateProfileReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_PROFILE_SUCCESS: {
        return {
          ...state,
          profileUpdateFailed: false,
          profileUpdated: true,
          profileUpdating: false,
          errorMessage: "",
        };
      }
      case START_UPDATING_PROFILE:
        return {
          ...state,
          profileUpdated: false,
          profileUpdating: true,
          profileUpdateFailed: false,
        };
      case UPDATE_PROFILE_FAIL:
        return {
          ...state,
          profileUpdateFailed: true,
          profileUpdated: false,
          profileUpdating: false,
          errorMessage: "Failed to update profile",
        };
  
      case CLEAR_UPDATE_PROFILE_STATE:
        return {
          ...state,
          profileUpdateFailed: false,
          profileUpdated: false,
          profileUpdating: false,
          errorMessage: "",
        };
  
      default:
        return state;
    }
  };
  
  export default updateProfileReducer;
  