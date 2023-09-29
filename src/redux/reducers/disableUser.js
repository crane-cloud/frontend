import {
  DISABLE_USER_FAIL,
  DISABLING_USER,
  DISABLE_USER_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  isDisabled: false,
  disabledFailed: false,
  isDisabling: false,
  user: null,
  error: null,
  message: "",
};

const disableUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISABLE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isDisabling: false,
        disabledFailed: false,
        isDisabled: true,
        message: "User Disabled Successfully",
      };

    case DISABLING_USER:
      return {
        ...state,
        isDisabling: true,
        isDisabled: false,
      };

    case DISABLE_USER_FAIL:
      return {
        ...state,
        disabledFailed: true,
        isDisabled: false,
        isDisabling: false,
        error: action.payload?.error,
        message: "Failed to disable user",
      };

    default:
      return state;
  }
};

export default disableUserReducer;
