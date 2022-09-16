import deleteDatabaseReducer from "../deleteDatabase";
import {
  DELETE_DATABASE_SUCCESS,
  DELETE_DATABASE_FAIL,
  START_DELETING_DATABASE,
  CLEAR_DELETE_DATABASE_STATE,
} from "../../actions/actionTypes";

const initialState = {
  databaseDeleted: false,
  deletingDatabase: false,
  databaseDeleteFailed: false,
  dbDeleteMessage: "",
};

const fetchAction = {
  type: DELETE_DATABASE_SUCCESS,
  deletingDatabase: false,
  DatabaseDeleted: true,
  databaseDeleteFailed: false,
  dbDeleteMessage: "Database Deleted Successfully",
};

const fetchFailedAction = {
  type: DELETE_DATABASE_FAIL,
  deletingDatabase: false,
  databaseDeleted: false,
  databaseDeleteFailed: true,
  dbDeleteMessage: "Failed to delete database. Please retry",
};

const startFetchingAction = {
  type: START_DELETING_DATABASE,
};

const clearAction = {
  type: CLEAR_DELETE_DATABASE_STATE,
};

describe("deleteDatabaseReducer initial state", () => {
  it("should return the initial state", () => {
    expect(deleteDatabaseReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(deleteDatabaseReducer(initialState, fetchAction)).toEqual({
      deletingDatabase: false,
      DatabaseDeleted: true,
      databaseDeleteFailed: false,
      databaseDeleted: false,
      dbDeleteMessage: "Database Deleted Successfully",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(deleteDatabaseReducer(initialState, fetchFailedAction)).toEqual({
      deletingDatabase: false,
      databaseDeleted: false,
      databaseDeleteFailed: true,
      dbDeleteMessage: "Failed to delete database. Please retry",
    });
  });

  it("should handle adding database", () => {
    expect(deleteDatabaseReducer(initialState, startFetchingAction)).toEqual({
      databaseDeleted: false,
      deletingDatabase: true,
      databaseDeleteFailed: false,
      dbDeleteMessage: "",
    });
  });

  it("should handle clear adding database", () => {
    expect(deleteDatabaseReducer(initialState, clearAction)).toEqual({
      databaseDeleted: false,
      deletingDatabase: false,
      databaseDeleteFailed: false,
      dbDeleteMessage: "",
    });
  });
});
