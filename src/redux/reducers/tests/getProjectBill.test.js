import getProjectBillReducer from "../getProjectBill";
import {
  GETTING_PROJECT_BILLING_INFO,
  PROJECT_BILLING_INFO_SUCCESS,
  PROJECT_BILLING_INFO_FAIL,
} from "../../actions/actionTypes";

const initialState = {
  projectBill: [],
  isRetrieving: false,
  isFetched: false,
  message: "Project Bill Information Not Available",
};

const fetchAction = {
  type: PROJECT_BILLING_INFO_SUCCESS,
  projectBill: undefined,
  isRetrieving: false,
  isFetched: true,
  message: "Project Bill fetched",
};

const fetchFailedAction = {
  type: PROJECT_BILLING_INFO_FAIL,
  message: undefined,
  isFetched: false,
  isRetrieving: false,
};

const startFetchingAction = {
  type: GETTING_PROJECT_BILLING_INFO,
};

describe("getProjectBillReducer initial state", () => {
  it("should return the initial state", () => {
    expect(getProjectBillReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle project added", () => {
    expect(getProjectBillReducer(initialState, fetchAction)).toEqual({
      projectBill: undefined,
      isRetrieving: false,
      isFetched: true,
      message: "Project Bill fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(getProjectBillReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isFetched: false,
      isRetrieving: false,
      projectBill: []
    });
  });

  it("should handle adding project", () => {
    expect(getProjectBillReducer(initialState, startFetchingAction)).toEqual({
      projectBill: [],
      isRetrieving: true,
      isFetched: false,
      message: "Project Bill Information Not Available",
    });
  });
});
