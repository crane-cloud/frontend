import resetDatabaseReducer from "../resetDatabase";
import {
  RESET_DATABASE_SUCCESS,
  RESET_DATABASE_FAIL,
  START_RESETING_DATABASE,
  CLEAR_RESET_DATABASE_STATE,
} from "../../actions/actionTypes";

const initialState = {
  isReset: false,
  isReseting: false,
  resetFailed: false,
  resetMessage: "",
};

const fetchAction = {
  type: RESET_DATABASE_SUCCESS,
  isReseting: false,
  isReset: true,
  resetFailed: false,
  resetMessage: "Database Reset Successfully",
};

const fetchFailedAction = {
  type: RESET_DATABASE_FAIL,
  isReseting: false,
  isReset: false,
  resetFailed: true,
  resetMessage: "Failed to reset database. Please retry",
};

const startFetchingAction = {
  type: START_RESETING_DATABASE,
};

const clearAction = {
  type: CLEAR_RESET_DATABASE_STATE,
};

describe("resetDatabaseReducer initial state", () => {
  it("should return the initial state", () => {
    expect(resetDatabaseReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(resetDatabaseReducer(initialState, fetchAction)).toEqual({
      isReseting: false,
      isReset: true,
      resetFailed: false,
      resetMessage: "Database Reset Successfully",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(resetDatabaseReducer(initialState, fetchFailedAction)).toEqual({
      isReseting: false,
      isReset: false,
      resetFailed: true,
      resetMessage: "Failed to reset database. Please retry",
    });
  });

  it("should handle adding database", () => {
    expect(resetDatabaseReducer(initialState, startFetchingAction)).toEqual({
      isReseting: true,
      isReset: false,
      resetFailed: false,
      resetMessage: "",
    });
  });

  it("should handle clear adding database", () => {
    expect(resetDatabaseReducer(initialState, clearAction)).toEqual({
      isReset: false,
      isReseting: false,
      resetFailed: false,
      resetMessage: "",
    });
  });
});
