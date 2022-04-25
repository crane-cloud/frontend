import {
  ADMIN_CREATE_DATABASE_SUCCESS,
  ADMIN_CREATE_DATABASE_FAIL,
  ADMIN_START_CREATING_DATABASE,
  ADMIN_CLEAR_ADD_DATABASE_STATE,
} from "../actions/actionTypes";

const initialState = {
  database: null,
  isCreated: false,
  isCreating: false,
  message: "",
  errorCode: null,
};

const adminCreateDBReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_CREATE_DATABASE_SUCCESS:
      return {
        ...state,
        database: action.payload,
        isCreating: false,
        isCreated: true,
        message: "Success! Your database has been created.",
        errorCode: null,
      };

    case ADMIN_START_CREATING_DATABASE:
      return {
        ...state,
        database: null,
        isCreating: true,
        isCreated: false,
        message: "",
        errorCode: null,
      };

    case ADMIN_CREATE_DATABASE_FAIL:
      return {
        ...state,
        database: null,
        isCreating: false,
        isCreated: false,
        message: "Failed to create database. Please try again",
        errorCode: action.payload?.errorCode,
      };

    case ADMIN_CLEAR_ADD_DATABASE_STATE:
      return {
        ...state,
        database: null,
        isCreated: false,
        isCreating: false,
        message: "",
        errorCode: null,
      };

    default:
      return state;
  }
};

export default adminCreateDBReducer;
