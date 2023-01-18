import createDatabaseReducer from "../createDatabase";
import {
  CREATE_DATABASE_SUCCESS,
  CREATE_DATABASE_FAIL,
  START_CREATING_DATABASE,
  CLEAR_ADD_DATABASE_STATE,
} from "../../actions/actionTypes";

const initialDBState = {
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
  it("should handle database added", () => {
    expect(createDatabaseReducer(initialDBState, fetchAction)).toEqual({
      database: undefined,
      isCreating: false,
      isCreated: true,
      message: "Success! Your database has been created.",
      errorCode: null,
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(createDatabaseReducer(initialDBState, fetchFailedAction)).toEqual({
      database: undefined,
      isCreating: false,
      isCreated: true,
      message: "Success! Your database has been created.",
      errorCode: null,
    });
  });

  it("should handle adding database", () => {
    expect(createDatabaseReducer(initialDBState, startFetchingAction)).toEqual({
      database: undefined,
      isCreating: false,
      isCreated: true,
      message: "Success! Your database has been created.",
      errorCode: null,
    });
  });

  it("should handle clear adding database", () => {
    expect(createDatabaseReducer(initialDBState, clearAction)).toEqual({
      isCreated: true,
      isCreating: false,
      message: "Success! Your database has been created.",
      errorCode: null,
      database:undefined
    });
  });
});
