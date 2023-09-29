import {
  ENABLE_USER_FAIL,
  DISABLING_USER,
  ENABLE_USER_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  isEnabled: false,
  enabledFailed: false,
  isDisabling: false,
  user: null,
  error: null,
  message: "",
};

const enableUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENABLE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isDisabling: false,
        enabledFailed: false,
        isEnabled: true,
        message: "User Enabled Successfully",
      };

    case DISABLING_USER:
      return {
        ...state,
        isDisabling: true,
        isEnabled: false,
      };

    case ENABLE_USER_FAIL:
      return {
        ...state,
        enabledFailed: true,
        isEnabled: false,
        isDisabling: false,
        error: action.payload?.error,
        message: "Failed to enable user",
      };

    default:
      return state;
  }
};

export default enableUserReducer;
