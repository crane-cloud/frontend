import clustersReducer from "../clusters";
import {
  GET_CLUSTERS,
  GET_CLUSTERS_FAIL,
  START_GETTING_CLUSTERS,
} from "../../actions/actionTypes";

const initialState = {
  clusters: [],
  isRetrieved: false,
  isRetrieving: false,
  message: "Clusters Not Available",
};

const fetchAction = {
  type: GET_CLUSTERS,
  clusters: undefined,
  isRetrieving: false,
  isRetrieved: true,
  message: "All Cluster fetched",
};

const fetchFailedAction = {
  type: GET_CLUSTERS_FAIL,
  message: undefined,
  isRetrieving: false,
  isRetrieved: false,
};

const startFetchingAction = {
  type: START_GETTING_CLUSTERS,
};

describe("clustersReducer initial state", () => {

  it("should handle cluster added", () => {
    expect(clustersReducer(initialState, fetchAction)).toEqual({
      clusters: undefined,
      isRetrieving: false,
      isRetrieved: true,
      message: "All Cluster fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(clustersReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isRetrieving: false,
      isRetrieved: false,
      clusters: []
    });
  });

  it("should handle adding cluster", () => {
    expect(clustersReducer(initialState, startFetchingAction)).toEqual({
      isRetrieving: true,
      clusters: [],
      isRetrieved: false,
      message: "Clusters Not Available"
    });
  });
});
