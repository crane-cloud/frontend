import clusterResourcesReducer from "../clusterResources";
import {
  GET_RESOURCES_COUNT,
  GET_RESOURCES_COUNT_FAILED,
  START_GETTING_RESOURCES_COUNT,
} from "../../actions/actionTypes";

const initialState = {
  resourceCount: [],
  isRetrieving: false,
  isRetrieved: false,
  message: "Cluster Resources Not Available",
};

const fetchAction = {
  type: GET_RESOURCES_COUNT,
  resourceCount: undefined,
  isRetrieved: true,
  isRetrieving: false,
  clusterName: undefined,
  message: "All Cluster Resources fetched",
};

const fetchFailedAction = {
  type: GET_RESOURCES_COUNT_FAILED,
  message: undefined,
  isRetrieved: false,
  isRetrieving: false,
};

const startFetchingAction = {
  type: START_GETTING_RESOURCES_COUNT,
};

describe("clusterResourcesReducer initial state", () => {
  it("should handle cluster added", () => {
    expect(clusterResourcesReducer(initialState, fetchAction)).toEqual({
      resourceCount: undefined,
      isRetrieved: true,
      isRetrieving: false,
      clusterName: undefined,
      message: "All Cluster Resources fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(clusterResourcesReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isRetrieved: false,
      isRetrieving: false,
      resourceCount: []
    });
  });

  it("should handle adding cluster", () => {
    expect(clusterResourcesReducer(initialState, startFetchingAction)).toEqual({
      isRetrieved: false,
      isRetrieving: true,
      message: "Cluster Resources Not Available",
      resourceCount: []
    });
  });
});
