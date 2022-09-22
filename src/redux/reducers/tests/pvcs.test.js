import pvcsReducer from "../pvcs";
import {
  FETCH_PVCS_SUCCESS,
  FETCH_PVCS_FAILED,
  IS_FETCHING,
} from "../../actions/actionTypes";

const initialState = {
  pvcs: [],
  isRetrieving: false,
  isFetched: false,
  message: "Cluster pvcs Not Available",
};

const fetchAction = {
  type: FETCH_PVCS_SUCCESS,
  pvcs: undefined,
  isRetrieving: false,
  isFetched: true,
  message: "All Cluster pvcs fetched",
};

const fetchFailedAction = {
  type: FETCH_PVCS_FAILED,
  message: undefined,
  isFetched: false,
  isRetrieving: false,
};

const startFetchingAction = {
  type: IS_FETCHING,
};
describe("pvcsReducer initial state", () => {
  it("should return the initial state", () => {
    expect(pvcsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle pvcs added", () => {
    expect(pvcsReducer(initialState, fetchAction)).toEqual({
      pvcs: undefined,
      isRetrieving: false,
      isFetched: true,
      message: "All Cluster Pvcs fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(pvcsReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isFetched: false,
      isRetrieving: false,
      pvcs: [],
    });
  });

  it("should handle adding pvcs", () => {
    expect(pvcsReducer(initialState, startFetchingAction)).toEqual({
      pvcs: [],
      isRetrieving: true,
      isFetched: false,
      message: "Cluster pvcs Not Available",
    });
  });
});
