import jobsReducer from "../jobs";
import {
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILED,
  IS_FETCHING,
} from "../../actions/actionTypes";

const initialState = {
  pvcs: [],
  isRetrieving: false,
  isFetched: false,
  message: "Cluster Jobs Not Available",
};

const fetchAction = {
  type: FETCH_JOBS_SUCCESS,
  pvcs: undefined,
  isRetrieving: false,
  isFetched: true,
  message: "All Cluster Jobs fetched",
};

const fetchFailedAction = {
  type: FETCH_JOBS_FAILED,
  message: undefined,
  isFetched: false,
  isRetrieving: false,
};

const startFetchingAction = {
  type: IS_FETCHING,
};
describe("jobsReducer initial state", () => {
  it("should return the initial state", () => {
    expect(jobsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle pvcs added", () => {
    expect(jobsReducer(initialState, fetchAction)).toEqual({
      pvcs: [],
      jobs: undefined,
      isRetrieving: false,
      isFetched: true,
      message: "All Cluster Jobs fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(jobsReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isFetched: false,
      isRetrieving: false,
      pvcs: [],
    });
  });

  it("should handle adding pvcs", () => {
    expect(jobsReducer(initialState, startFetchingAction)).toEqual({
      pvcs: [],
      isRetrieving: true,
      isFetched: false,
      message: "Cluster Jobs Not Available",
    });
  });
});
