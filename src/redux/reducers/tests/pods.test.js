import PodsReducer from "../pods";
import {
  START_GETTING_PODS,
  GET_PODS_FAIL,
  GET_PODS_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  pods: {},
  isRetrieving: false,
  isFetched: false,
  message: "Pods Not Available",
};

const fetchAction = {
  type: GET_PODS_SUCCESS,
  pods: undefined,
  isRetrieving: false,
  isFetched: true,
  message: "All Pods fetched",
};

const fetchFailedAction = {
  type: GET_PODS_FAIL,
  message: undefined,
  isFetched: false,
  isRetrieving: false,
};

const startFetchingAction = {
  type: START_GETTING_PODS,
};
describe("PodsReducer initial state", () => {
  it("should return the initial state", () => {
    expect(PodsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle pods added", () => {
    expect(PodsReducer(initialState, fetchAction)).toEqual({
      pods:undefined,
      isRetrieving: false,
      isFetched: true,
      message: "All Pods fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(PodsReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isFetched: false,
      isRetrieving: false,
      pods: {},
    });
  });

  it("should handle adding pods", () => {
    expect(PodsReducer(initialState, startFetchingAction)).toEqual({
      pods: {},
      isRetrieving: true,
      isFetched: false,
      message: "Pods Not Available",
    });
  });
});
