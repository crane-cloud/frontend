import {
  GET_CLUSTERS,
  GET_CLUSTERS_FAIL,
  START_GETTING_CLUSTERS,
} from "../actions/actionTypes";
import clustersReducer from "../reducers/clusters";

const initialState = {
  clusters: [],
  isRetrieved: false,
  isRetrieving: false,
  message: "Clusters Not Available",
};

const clusterResourcesSuccess = {
  type: GET_CLUSTERS,
  isRetrieving: false,
  isRetrieved: true,
};

const clusterResourcesFail = {
  type: GET_CLUSTERS_FAIL,
  FetchedAppsSummary: false,
  isFetchingAppsSummary: false,
  errorCode: "action.payload.errorCode",
};

const startFetchingAction = {
  type: START_GETTING_CLUSTERS,
};

describe("add get clusterResources Reducer initial state", () => {
  it("should return the initial state", () => {
    expect(
      clustersReducer(
        {
          clusters: [],
          isRetrieving: false,
          isRetrieved: false,
          message: "Clusters Not Available",
        },
        {}
      )
    ).toEqual(initialState);
  });
  it("should handle  get DATABASE_SUCCESS", () => {
    expect(clustersReducer(initialState, clusterResourcesSuccess)).toEqual({
      ...initialState,
      resourceCount: undefined,
      message: "All Cluster fetched",
      clusterName: undefined,
      isRetrieved: true,
      clusters: undefined,
    });
  });

  it("should handle get  clusterResources FAIL", () => {
    expect(clustersReducer(initialState, clusterResourcesFail)).toEqual({
      ...initialState,
      message: undefined,
      isRetrieved: false,
      isRetrieving: false,
    });
  });

  it("should handle getting  clusterResources STARTED", () => {
    expect(clustersReducer(initialState, startFetchingAction)).toEqual({
      ...initialState,
      isRetrieving: true,
    });
  });
});
