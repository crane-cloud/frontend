import {
  START_UPDATING_APP,
  CLEAR_UPDATE_APP_STATE,
  UPDATE_APP_SUCCESS,
  UPDATE_APP_FAIL,
} from "../actions/actionTypes";
const initialState = {
  isUpdated: false,
  isUpdating: false,
  errorMessage: "",
  errorCode: null,
};

const updateAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_APP_SUCCESS: {
      return {
        ...state,
        app: action.payload,
        isFailed: false,
        isUpdated: true,
        isUpdating: false,
        errorMessage: "",
        errorCode: null,
      };
    }
    case START_UPDATING_APP:
      return {
        ...state,
        isUpdated: false,
        isUpdating: true,
        errorCode: null,
        isFailed: false,
      };
    case UPDATE_APP_FAIL:
      return {
        ...state,
        isFailed: true,
        isUpdated: false,
        isUpdating: false,
        errorCode: action.payload?.errorCode,
        errorMessage: "Failed to update App",
      };

    case CLEAR_UPDATE_APP_STATE:
      return {
        ...state,
        isFailed: false,
        isUpdated: false,
        isUpdating: false,
        errorCode: null,
        errorMessage: "",
      };

    default:
      return state;
  }
};

export default updateAppReducer;
