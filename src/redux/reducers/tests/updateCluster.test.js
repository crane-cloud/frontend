import updateClusterReducer from "../updateCluster";
import {
  START_UPDATING_CLUSTER,
  CLEAR_CLUSTER_UPDATE_STATE,
  UPDATE_CLUSTER_SUCCESS,
  UPDATE_CLUSTER_FAILED,
} from "../../actions/actionTypes";

const initialState = {
  isUpdated: false,
  isUpdating: false,
  errorMessage: "",
  errorCode: null,
};

const fetchAction = {
  type: UPDATE_CLUSTER_SUCCESS,
  project: undefined,
  isFailed: false,
  isUpdated: true,
  isUpdating: false,
  errorMessage: "",
  errorCode: null,
};

const fetchFailedAction = {
  type: UPDATE_CLUSTER_FAILED,
  message: undefined,
  isReverted: false,
  isReverting: false,
};

const startFetchingAction = {
  type: START_UPDATING_CLUSTER,
};
const clearAction = {
  type: CLEAR_CLUSTER_UPDATE_STATE,
};
describe("updateClusterReducer initial state", () => {
  it("should return the initial state", () => {
    expect(updateClusterReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(updateClusterReducer(initialState, fetchAction)).toEqual({
      project: undefined,
      isFailed: false,
      isUpdated: true,
      isUpdating: false,
      errorMessage: "",
      errorCode: null,
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(updateClusterReducer(initialState, fetchFailedAction)).toEqual({
      isFailed: true,
      isUpdated: false,
      isUpdating: false,
      errorCode: undefined,
      errorMessage: "Failed to update Cluster",
    });
  });

  it("should handle adding database", () => {
    expect(updateClusterReducer(initialState, startFetchingAction)).toEqual({
      isUpdated: false,
      isUpdating: true,
      errorMessage: "",
      errorCode: null,
      isFailed: false
    });
  });

  it("should handle clear adding database", () => {
    expect(updateClusterReducer(initialState, clearAction)).toEqual({
      isUpdated: false,
      isUpdating: false,
      errorMessage: "",
      errorCode: null,
      isFailed: false
    });
  });
});
