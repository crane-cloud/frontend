import {
  ADD_CLUSTER_SUCCESS,
  ADD_CLUSTERS_FAIL,
  START_ADDING_CLUSTER,
} from "../actions/actionTypes";
import addClusterReducer from "../reducers/addCluster";

const initialState = {
  isAdded: false,
  isFailed: false,
  creatingCluster: false,
  cluster: null,
  message: "",
};

const postCluster = {
  type: ADD_CLUSTER_SUCCESS,
  cluster: "action.payload",
  status: true,
  isPosting: false,
  message: "Articles successfully created",
};

const postClusterFailedAction = {
  type: ADD_CLUSTERS_FAIL,
  error: "action.payload.error",
  status: false,
};

const startFetchingAction = {
  type: START_ADDING_CLUSTER,
};

describe("addClusterReducer initial state", () => {
  it("should return the initial state", () => {
    expect(
      addClusterReducer(
        {
          isAdded: false,
          isFailed: false,
          creatingCluster: false,
          cluster: null,
          message: "",
        },
        {}
      )
    ).toEqual(initialState);
  });

  it("should handle ADD_CLUSTER_SUCCESS", () => {
    expect(addClusterReducer(initialState, postCluster)).toEqual({
      ...initialState,
      cluster: undefined,
      message: "Cluster Added SuccessFully",
      creatingCluster: false,
      isFailed: false,
      isAdded: true,
    });
  });

  it("should handle ADD_CLUSTER_FAIL", () => {
    expect(addClusterReducer(initialState, postClusterFailedAction)).toEqual({
      ...initialState,
      isFailed: true,
      isAdded: false,
      creatingCluster: false,
      message: "Failed to add cluster",
    });
  });

  it("should handle POSTING_STARTED", () => {
    expect(addClusterReducer(initialState, startFetchingAction)).toEqual({
      ...initialState,
      creatingCluster: true,
      isAdded: false,
    });
  });
});
