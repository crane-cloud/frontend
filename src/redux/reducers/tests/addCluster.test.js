import addClusterReducer from "../addCluster";
import {
  ADD_CLUSTER_SUCCESS,
  ADD_CLUSTERS_FAIL,
  START_ADDING_CLUSTER,
  CLEAR_ADD_CLUSTER_STATE,
} from "../../actions/actionTypes";

const initialState = {
  isAdded: false,
  isFailed: false,
  creatingCluster: false,
  cluster: null,
  error: null,
  message: "",
};

const fetchAction = {
  type: ADD_CLUSTER_SUCCESS,
  payload: [{ cluster_id: 1, name: "testing" }],
  creatingCluster: false,
  isFailed: false,
  isAdded: true,
  message: "Cluster Added SuccessFully",
};

const fetchFailedAction = {
  type: ADD_CLUSTERS_FAIL,
  isFailed: true,
  isAdded: false,
  creatingCluster: false,
  message: "Failed to add cluster",
};

const startFetchingAction = {
  type: START_ADDING_CLUSTER,
};

const clearAction = {
  type: CLEAR_ADD_CLUSTER_STATE,
}

describe("addClusterReducer initial state", () => {
  it("should return the initial state", () => {
    expect(addClusterReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle cluster added", () => {
    expect(addClusterReducer(initialState, fetchAction)).toEqual({
      error:null,
      cluster: [{ cluster_id: 1, name: "testing" }],
      message: "Cluster Added SuccessFully",
      creatingCluster: false,
      isFailed: false,
      isAdded: true,
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(addClusterReducer(initialState, fetchFailedAction)).toEqual({
      isFailed: true,
      isAdded: false,
      creatingCluster: false,
      message: "Failed to add cluster",
      error: undefined,
      cluster:null
    });
  });

  it("should handle adding cluster", () => {
    expect(addClusterReducer(initialState, startFetchingAction)).toEqual({
      creatingCluster: true,
      isAdded: false,
      message: "",
      error: null,
      cluster: null,
      isFailed: false
    });
  });

  it("should handle clear adding cluster", () => {
    expect(addClusterReducer(initialState, clearAction)).toEqual({
      creatingCluster: false,
      isAdded: false,
      message: "",
      error: null,
      cluster: null,
      isFailed: false
    });
  });
});
