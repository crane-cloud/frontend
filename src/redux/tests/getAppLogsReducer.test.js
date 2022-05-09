import {
  GET_APP_LOGS_SUCCESS,
  GET_APPS_LOGS_FAIL,
  START_GETTING_APP_LOGS,
} from "../actions/actionTypes";
import appLogsReducer from "../reducers/getAppLogs";

const initialState = {
  logs: [],
  retrievedLogs: false,
  retrieveingLogs: false,
};

const appLogsSuccess = {
  type: GET_APP_LOGS_SUCCESS,
  retrieveingLogs: false,
};

const appLogsFail = {
  type: GET_APPS_LOGS_FAIL,
  logs: [],
  retrieveingLogs: false,
  retrievedLogs: false,
};

const startFetchingAction = {
  type: START_GETTING_APP_LOGS,
  logs: [],
  retrievedLogs: false,
};

describe("add get appLogs Reducer initial state", () => {
  it("should return the initial state", () => {
    expect(
      appLogsReducer(
        {
          logs: [],
          retrievedLogs: false,
          retrieveingLogs: false,
        },
        {}
      )
    ).toEqual(initialState);
  });
  it("should handle  get create database SUCCESS", () => {
    expect(appLogsReducer(initialState, appLogsSuccess)).toEqual({
      ...initialState,
      logs: undefined,
      retrievedLogs: true,
    });
  });

  it("should handle get  appLogs FAIL", () => {
    expect(appLogsReducer(initialState, appLogsFail)).toEqual({
      ...initialState,
    });
  });

  it("should handle getting  appLogs STARTED", () => {
    expect(appLogsReducer(initialState, startFetchingAction)).toEqual({
      ...initialState,
      retrieveingLogs: true,
    });
  });
});
