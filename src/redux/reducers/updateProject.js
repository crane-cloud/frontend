import {
  START_UPDATING_PROJECT,
  CLEAR_UPDATE_PROJECT_STATE,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILED,
} from "../actions/actionTypes";

const initialState = {
  isUpdated: false,
  isUpdating: false,
  errorMessage: "",
  errorCode: null,
};

const updateProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROJECT_SUCCESS: {
      return {
        ...state,
        project: action.payload,
        isFailed: false,
        isUpdated: true,
        isUpdating: false,
        errorMessage: "",
        errorCode: null,
      };
    }
    case START_UPDATING_PROJECT:
      return {
        ...state,
        isUpdated: false,
        isUpdating: true,
        errorCode: null,
        isFailed: false,
      };
    case UPDATE_PROJECT_FAILED:
      return {
        ...state,
        isFailed: true,
        isUpdated: false,
        isUpdating: false,
        errorCode: action.payload?.errorCode,
        errorMessage: "Failed to update Project",
      };

    case CLEAR_UPDATE_PROJECT_STATE:
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

export default updateProjectReducer;
