import pvsReducer from "../pvs";
import {
  FETCH_PVS_SUCCESS,
  FETCH_PVS_FAILED,
  IS_FETCHING,
} from "../../actions/actionTypes";

const initialState = {
  pvs: [],
  pagination:{},
  isRetrieving: false,
  isFetched: false,
  message: "Cluster Volumes Not Available",
};

const fetchAction = {
  type: FETCH_PVS_SUCCESS,
  payload: {
    pvs:[],
    pagination:{},
  }
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
      pvs: [],
      isRetrieving: false,
      isFetched: true,
      pagination:{},
      message: "All Cluster Volumes fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(pvsReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isFetched: false,
      isRetrieving: false,
      pagination:{},
      pvs: [],
    });
  });

  it("should handle adding pvs", () => {
    expect(pvsReducer(initialState, startFetchingAction)).toEqual({
      pvs: [],
      isRetrieving: true,
      isFetched: false,
      pagination:{},
      message: "Cluster Volumes Not Available",
    });
  });
});
