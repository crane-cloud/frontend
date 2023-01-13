import createDatabaseReducer from "../createDatabase";
import {
  CREATE_DATABASE_SUCCESS,
  CREATE_DATABASE_FAIL,
  START_CREATING_DATABASE,
  CLEAR_ADD_DATABASE_STATE,
} from "../../actions/actionTypes";

const initialState = {
  database: null,
  isCreated: false,
  isCreating: false,
  message: "",
  errorCode: null,
};

const fetchAction = {
  type: CREATE_DATABASE_SUCCESS,
  database: undefined,
  isCreating: false,
  isCreated: true,
  message: "Success! Your database has been created.",
  errorCode: null,
};

const fetchFailedAction = {
  type: CREATE_DATABASE_FAIL,
  database: null,
  isCreating: false,
  isCreated: false,
  message: "Failed to create database. Please try again",
  errorCode: undefined,
};

const startFetchingAction = {
  type: START_CREATING_DATABASE,
};

const clearAction = {
  type: CLEAR_ADD_DATABASE_STATE,
};

describe("createDatabaseReducer initial state", () => {
  it("should return the initial state", () => {
    expect(createDatabaseReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(createDatabaseReducer(initialState, fetchAction)).toEqual({
      database: undefined,
      isCreating: false,
      isCreated: true,
      message: "Success! Your database has been created.",
      errorCode: null,
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(createDatabaseReducer(initialState, fetchFailedAction)).toEqual({
      database: null,
      isCreating: false,
      isCreated: false,
      message: "Failed to create database. Please try again",
      errorCode: undefined,
    });
  });

  it("should handle adding database", () => {
    expect(createDatabaseReducer(initialState, startFetchingAction)).toEqual({
      database: null,
      isCreating: true,
      isCreated: false,
      message: "",
      errorCode: null,
    });
  });

  it("should handle clear adding database", () => {
    expect(createDatabaseReducer(initialState, clearAction)).toEqual({
      database: null,
      isCreated: false,
      isCreating: false,
      message: "",
      errorCode: null,
    });
  });
});
