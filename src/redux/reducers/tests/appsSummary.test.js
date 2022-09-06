import appsSummaryReducer from "../appsSummary";
import {
  GETTING_APPS_SUMMARY,
  APPS_SUMMARY_SUCCESS,
  APPS_SUMMARY_FAIL,
} from "../../actions/actionTypes";

const initialState = {
  FetchedAppsSummary: false,
  isFetchingAppsSummary: false,
  message: "",
  errorCode: null,
};

const fetchAction = {
  type: APPS_SUMMARY_SUCCESS,
  summary: [],
  summaryIsFailed: false,
  FetchedAppsSummary: true,
  isFetchingAppsSummary: false,
  message: "Summary got!",
  errorCode: null,
};

const fetchFailedAction = {
  type: APPS_SUMMARY_FAIL,
  summaryIsFailed: true,
  FetchedAppsSummary: false,
  isFetchingAppsSummary: false,
  errorCode: undefined,
  message: "Summary Failed",
};

const startFetchingAction = {
  type: GETTING_APPS_SUMMARY,
};

describe("appsSummaryReducer initial state", () => {
  it("should handle cluster added", () => {
    expect(appsSummaryReducer(initialState, fetchAction)).toEqual({
      summary: undefined,
      summaryIsFailed: false,
      FetchedAppsSummary: true,
      isFetchingAppsSummary: false,
      message: "Summary got!",
      errorCode: null,
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(appsSummaryReducer(initialState, fetchFailedAction)).toEqual({
      summaryIsFailed: true,
      FetchedAppsSummary: false,
      isFetchingAppsSummary: false,
      errorCode: undefined,
      message: "Summary Failed",
    });
  });

  it("should handle adding cluster", () => {
    expect(appsSummaryReducer(initialState, startFetchingAction)).toEqual({
      FetchedAppsSummary: false,
      isFetchingAppsSummary: true,
      errorCode: null,
      summaryIsFailed: false,
      message: ""
    });
  });
});
