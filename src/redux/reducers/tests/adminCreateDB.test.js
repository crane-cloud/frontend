import adminCreateDBReducer from "../adminCreateDB";
import {
  ADMIN_CREATE_DATABASE_SUCCESS,
  ADMIN_CREATE_DATABASE_FAIL,
  ADMIN_START_CREATING_DATABASE,
  ADMIN_CLEAR_ADD_DATABASE_STATE,
} from "../../actions/actionTypes";

const initialState = {
  database: null,
  isCreated: false,
  isCreating: false,
  message: "",
  errorCode: null,
};

const fetchAction = {
  type: ADMIN_CREATE_DATABASE_SUCCESS,
  database: {},
  isCreating: false,
  isCreated: true,
  message: "Success! Your database has been created.",
  errorCode: null,
};

const fetchFailedAction = {
  type: ADMIN_CREATE_DATABASE_FAIL,
  database: null,
  isCreating: false,
  isCreated: false,
  message: "Failed to create database. Please try again",
  errorCode: "",
};

const startFetchingAction = {
  type: ADMIN_START_CREATING_DATABASE,
};

const clearAction = {
  type: ADMIN_CLEAR_ADD_DATABASE_STATE,
};

describe("adminCreateDBReducer initial state", () => {
  it("should return the initial state", () => {
    expect(adminCreateDBReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(adminCreateDBReducer(initialState, fetchAction)).toEqual({
      database: undefined,
      isCreating: false,
      isCreated: true,
      message: "Success! Your database has been created.",
      errorCode: null,
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(adminCreateDBReducer(initialState, fetchFailedAction)).toEqual({
      database: null,
      isCreating: false,
      isCreated: false,
      message: "Failed to create database. Please try again",
      errorCode: undefined,
    });
  });

  it("should handle adding database", () => {
    expect(adminCreateDBReducer(initialState, startFetchingAction)).toEqual({
      database: null,
      isCreating: true,
      isCreated: false,
      message: "",
      errorCode: null,
    });
  });

  it("should handle clear adding database", () => {
    expect(adminCreateDBReducer(initialState, clearAction)).toEqual({
      database: null,
      isCreated: false,
      isCreating: false,
      message: "",
      errorCode: null,
    });
  });
});
