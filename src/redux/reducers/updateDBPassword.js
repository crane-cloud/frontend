import {
  START_UPDATING_DATABASE_PASSWORD,
  CLEAR_UPDATE_DATABASE_PASSWORD_STATE,
  UPDATE_DATABASE_PASSWORD_SUCCESS,
  UPDATE_DATABASE_PASSWORD_FAILED,
} from "../actions/actionTypes";

const initialState = {
  dbPasswordUpdated: false,
  updatingDBPassword: false,
  errorMessage: "",
  errorCode: null,
};

const updateDatabasePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DATABASE_PASSWORD_SUCCESS: {
      return {
        ...state,
        database: action.payload,
        updateDBPasswordFailed: false,
        dbPasswordUpdated: true,
        updatingDBPassword: false,
        errorMessage: "",
        errorCode: null,
      };
    }
    case START_UPDATING_DATABASE_PASSWORD:
      return {
        ...state,
        dbPasswordUpdated: false,
        updatingDBPassword: true,
        errorCode: null,
        updateDBPasswordFailed: false,
      };
    case UPDATE_DATABASE_PASSWORD_FAILED:
      return {
        ...state,
        updateDBPasswordFailed: true,
        dbPasswordUpdated: false,
        updatingDBPassword: false,
        errorCode: action.payload.errorCode,
        errorMessage: "Failed to update DatabasePassword",
      };

    case CLEAR_UPDATE_DATABASE_PASSWORD_STATE:
      return {
        ...state,
        updateDBPasswordFailed: false,
        dbPasswordUpdated: false,
        updatingDBPassword: false,
        errorCode: null,
        errorMessage: "",
      };

    default:
      return state;
  }
};

export default updateDatabasePasswordReducer;
