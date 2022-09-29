import pvsReducer from "../pvs";
import {
  FETCH_PVS_SUCCESS,
  FETCH_PVS_FAILED,
  IS_FETCHING,
} from "../../actions/actionTypes";

const initialState = {
  pvs: [],
  isRetrieving: false,
  isFetched: false,
  message: "Cluster Volumes Not Available",
};

const fetchAction = {
  type: FETCH_PVS_SUCCESS,
  pvs: undefined,
  isRetrieving: false,
  isFetched: true,
  message: "All Cluster Volumes fetched",
};

const fetchFailedAction = {
  type: FETCH_PVS_FAILED,
  message: undefined,
  isFetched: false,
  isRetrieving: false,
};

const startFetchingAction = {
  type: IS_FETCHING,
};
describe("pvsReducer initial state", () => {
  it("should return the initial state", () => {
    expect(pvsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle pvs added", () => {
    expect(pvsReducer(initialState, fetchAction)).toEqual({
      pvs: undefined,
      isRetrieving: false,
      isFetched: true,
      message: "All Cluster Volumes fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(pvsReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isFetched: false,
      isRetrieving: false,
      pvs: [],
    });
  });

  it("should handle adding pvs", () => {
    expect(pvsReducer(initialState, startFetchingAction)).toEqual({
      pvs: [],
      isRetrieving: true,
      isFetched: false,
      message: "Cluster Volumes Not Available",
    });
  });
});
