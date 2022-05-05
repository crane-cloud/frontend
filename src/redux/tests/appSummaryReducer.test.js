import {
  GETTING_APPS_SUMMARY,
  APPS_SUMMARY_SUCCESS,
  APPS_SUMMARY_FAIL,
} from "../actions/actionTypes";
import appsSummaryReducer from "../reducers/appsSummary";

const initialState = {
  FetchedAppsSummary: false,
  isFetchingAppsSummary: false,
  message: "",
  errorCode: null,
};

const appListSuccess = {
  type: APPS_SUMMARY_SUCCESS,
  isFetchingAppsSummary: false,
  errorCode: null,
};

const appListFail = {
  type: APPS_SUMMARY_FAIL,
  FetchedAppsSummary: false,
  isFetchingAppsSummary: false,
  errorCode: "action.payload.errorCode",
};

const startFetchingAction = {
  type: GETTING_APPS_SUMMARY,
};

describe("add get appSummary Reducer initial state", () => {
  it("should return the initial state", () => {
    expect(
      appsSummaryReducer(
        {
          FetchedAppsSummary: false,
          isFetchingAppsSummary: false,
          message: "",
          errorCode: null,
        },
        {}
      )
    ).toEqual(initialState);
  });
  it("should handle  get DATABASE_SUCCESS", () => {
    expect(appsSummaryReducer(initialState, appListSuccess)).toEqual({
      ...initialState,
      summary: undefined,
      summaryIsFailed: false,
      FetchedAppsSummary: true,
      message: "Summary got!",
    });
  });

  it("should handle get  appSummary FAIL", () => {
    expect(appsSummaryReducer(initialState, appListFail)).toEqual({
      ...initialState,
      message: "Summary Failed",
      summaryIsFailed: true,
      errorCode: undefined,
    });
  });

  it("should handle getting  appSummary STARTED", () => {
    expect(appsSummaryReducer(initialState, startFetchingAction)).toEqual({
      ...initialState,
      FetchedAppsSummary: false,
      isFetchingAppsSummary: true,
      errorCode: null,
      summaryIsFailed: false,
    });
  });
});
