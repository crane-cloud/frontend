import updateDatabasePasswordReducer from "../updateDBPassword";
import {
  START_UPDATING_DATABASE_PASSWORD,
  CLEAR_UPDATE_DATABASE_PASSWORD_STATE,
  UPDATE_DATABASE_PASSWORD_SUCCESS,
  UPDATE_DATABASE_PASSWORD_FAILED,
} from "../../actions/actionTypes";

const initialState = {
  dbPasswordUpdated: false,
  updatingDBPassword: false,
  errorMessage: "",
  errorCode: null,
};

const fetchAction = {
  type: UPDATE_DATABASE_PASSWORD_SUCCESS,
  database: undefined,
  updateDBPasswordFailed: false,
  dbPasswordUpdated: true,
  updatingDBPassword: false,
  errorMessage: "",
  errorCode: null,
};

const fetchFailedAction = {
  type: UPDATE_DATABASE_PASSWORD_FAILED,
  updateDBPasswordFailed: true,
  dbPasswordUpdated: false,
  updatingDBPassword: false,
  errorCode: undefined,
  errorMessage: "Failed to update Database Password",
};

const startFetchingAction = {
  type: START_UPDATING_DATABASE_PASSWORD,
};
const clearAction = {
  type: CLEAR_UPDATE_DATABASE_PASSWORD_STATE,
};
describe("updateDatabasePasswordReducer initial state", () => {
  it("should return the initial state", () => {
    expect(updateDatabasePasswordReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(updateDatabasePasswordReducer(initialState, fetchAction)).toEqual({
      database: undefined,
      updateDBPasswordFailed: false,
      dbPasswordUpdated: true,
      updatingDBPassword: false,
      errorMessage: "",
      errorCode: null,
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(updateDatabasePasswordReducer(initialState, fetchFailedAction)).toEqual({
      updateDBPasswordFailed: true,
      dbPasswordUpdated: false,
      updatingDBPassword: false,
      errorCode: undefined,
      errorMessage: "Failed to update Database Password",
    });
  });

  it("should handle adding database", () => {
    expect(updateDatabasePasswordReducer(initialState, startFetchingAction)).toEqual({
      dbPasswordUpdated: false,
      updateDBPasswordFailed: false,
      updatingDBPassword: true,
      errorMessage: "",
      errorCode: null,
    });
  });

  it("should handle clear adding database", () => {
    expect(updateDatabasePasswordReducer(initialState, clearAction)).toEqual({
      dbPasswordUpdated: false,
      updatingDBPassword: false,
      updateDBPasswordFailed: false,
      errorMessage: "",
      errorCode: null,
    });
  });
});
