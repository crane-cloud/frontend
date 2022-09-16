import appLogsReducer from "../getAppLogs";
import {
  GET_APP_LOGS_SUCCESS,
  GET_APPS_LOGS_FAIL,
  START_GETTING_APP_LOGS,
} from "../../actions/actionTypes";

const initialState = {
  logs: [],
  retrievedLogs: false,
  retrieveingLogs: false,
};

const fetchAction = {
  type: GET_APP_LOGS_SUCCESS,
  logs: undefined,
  retrieveingLogs: false,
  retrievedLogs: true,
};

const fetchFailedAction = {
  type: GET_APPS_LOGS_FAIL,
  logs: [],
  retrieveingLogs: false,
  retrievedLogs: false,
};

const startFetchingAction = {
  type: START_GETTING_APP_LOGS,
};

describe("appLogsReducer initial state", () => {
  it("should return the initial state", () => {
    expect(appLogsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle app added", () => {
    expect(appLogsReducer(initialState, fetchAction)).toEqual({
      logs: undefined,
      retrieveingLogs: false,
      retrievedLogs: true,
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(appLogsReducer(initialState, fetchFailedAction)).toEqual({
      logs: [],
      retrieveingLogs: false,
      retrievedLogs: false,
    });
  });

  it("should handle adding app", () => {
    expect(appLogsReducer(initialState, startFetchingAction)).toEqual({
      logs: [],
      retrievedLogs: false,
      retrieveingLogs: true,
    });
  });
});
