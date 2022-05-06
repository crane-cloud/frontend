import {
  DELETE_DATABASE_SUCCESS,
  DELETE_DATABASE_FAIL,
  START_DELETING_DATABASE,
  CLEAR_DELETE_DATABASE_STATE,
} from "../actions/actionTypes";
import deleteDatabaseReducer from "../reducers/deleteDatabase";

const initialState = {
  databaseDeleted: false,
  deletingDatabase: false,
  databaseDeleteFailed: false,
  dbDeleteMessage: "",
};

const deleteAppSuccess = {
  type: DELETE_DATABASE_SUCCESS,
  deletingDatabase: false,
  databaseDeleteFailed: false,
};

const deleteAppFail = {
  type: DELETE_DATABASE_FAIL,
  deletingDatabase: false,
  databaseDeleted: false,
};

const startFetchingAction = {
  type: START_DELETING_DATABASE,
  databaseDeleted: false,
  databaseDeleteFailed: false,
  dbDeleteMessage: "",
};

const clearStateAction = {
  type: CLEAR_DELETE_DATABASE_STATE,
  databaseDeleted: false,
  deletingDatabase: false,
  databaseDeleteFailed: false,
  dbDeleteMessage: "",
};

describe("add get deleteApp Reducer initial state", () => {
  it("should return the initial state", () => {
    expect(
      deleteDatabaseReducer(
        {
          databaseDeleted: false,
          deletingDatabase: false,
          databaseDeleteFailed: false,
          dbDeleteMessage: "",
        },
        {}
      )
    ).toEqual(initialState);
  });
  it("should handle  get create database SUCCESS", () => {
    expect(deleteDatabaseReducer(initialState, deleteAppSuccess)).toEqual({
      ...initialState,
      DatabaseDeleted: true,
      dbDeleteMessage: "Database Deleted Successfully",
    });
  });

  it("should handle get  deleteApp FAIL", () => {
    expect(deleteDatabaseReducer(initialState, deleteAppFail)).toEqual({
      ...initialState,
      databaseDeleteFailed: true,
      dbDeleteMessage: "Failed to delete database. Please retry",
    });
  });

  it("should handle getting  deleteApp STARTED", () => {
    expect(deleteDatabaseReducer(initialState, startFetchingAction)).toEqual({
      ...initialState,
      deletingDatabase: true,
    });
  });

  it("should handle getting deleteApp cleared", () => {
    expect(deleteDatabaseReducer(initialState, clearStateAction)).toEqual({
      ...initialState,
    });
  });
});
