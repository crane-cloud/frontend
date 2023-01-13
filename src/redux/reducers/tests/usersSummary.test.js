import usersSummaryReducer from "../usersSummary";
import {
  GETTING_USERS_SUMMARY,
  USERS_SUMMARY_SUCCESS,
  USERS_SUMMARY_FAIL,
} from "../../actions/actionTypes";

const initialState = {
  FetchedUsersSummary: false,
  isFetchingUsersSummary: false,
  message: "",
  errorCode: null,
};

const fetchAction = {
  type: USERS_SUMMARY_SUCCESS,
  usersSummary: undefined,
  summaryIsFailed: false,
  FetchedUsersSummary: true,
  isFetchingUsersSummary: false,
  message: "Summary got!",
  errorCode: null,
};

const fetchFailedAction = {
  type: USERS_SUMMARY_FAIL,
  summaryIsFailed: true,
  FetchedUsersSummary: false,
  isFetchingUsersSummary: false,
  errorCode: undefined,
  message: "Summary Failed",
};

const startFetchingAction = {
  type: GETTING_USERS_SUMMARY,
};
describe("usersSummaryReducer initial state", () => {
  it("should return the initial state", () => {
    expect(usersSummaryReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(usersSummaryReducer(initialState, fetchAction)).toEqual({
      usersSummary: undefined,
      summaryIsFailed: false,
      FetchedUsersSummary: true,
      isFetchingUsersSummary: false,
      message: "Summary got!",
      errorCode: null,
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(usersSummaryReducer(initialState, fetchFailedAction)).toEqual({
      summaryIsFailed: true,
      FetchedUsersSummary: false,
      isFetchingUsersSummary: false,
      errorCode: undefined,
      message: "Summary Failed",
    });
  });

  it("should handle adding database", () => {
    expect(usersSummaryReducer(initialState, startFetchingAction)).toEqual({
      FetchedUsersSummary: false,
      isFetchingUsersSummary: true,
      message: "",
      errorCode: null,
      summaryIsFailed: false,
    });
  });
});
