import {
  GET_RESOURCES_COUNT,
  GET_RESOURCES_COUNT_FAILED,
  START_GETTING_RESOURCES_COUNT,
} from "../actions/actionTypes";
import clusterResourcesReducer from "../reducers/clusterResources";

const initialState = {
  resourceCount: [],
  isRetrieving: false,
  isRetrieved: false,
  message: "Cluster Resources Not Available",
};

const clusterResourcesSuccess = {
  type: GET_RESOURCES_COUNT,
  isRetrieving: false,
};

const clusterResourcesFail = {
  type: GET_RESOURCES_COUNT_FAILED,
  FetchedAppsSummary: false,
  isFetchingAppsSummary: false,
  errorCode: "action.payload.errorCode",
};

const startFetchingAction = {
  type: START_GETTING_RESOURCES_COUNT,
};

describe("add get clusterResources Reducer initial state", () => {
  it("should return the initial state", () => {
    expect(
      clusterResourcesReducer(
        {
          resourceCount: [],
          isRetrieving: false,
          isRetrieved: false,
          message: "Cluster Resources Not Available",
        },
        {}
      )
    ).toEqual(initialState);
  });
  it("should handle  get DATABASE_SUCCESS", () => {
    expect(
      clusterResourcesReducer(initialState, clusterResourcesSuccess)
    ).toEqual({
      ...initialState,
      resourceCount: undefined,
      message: "All Cluster Resources fetched",
      clusterName: undefined,
      isRetrieved: true,
    });
  });

  it("should handle get  clusterResources FAIL", () => {
    expect(clusterResourcesReducer(initialState, clusterResourcesFail)).toEqual(
      {
        ...initialState,
        message: undefined,
        isRetrieved: false,
        isRetrieving: false,
      }
    );
  });

  it("should handle getting  clusterResources STARTED", () => {
    expect(clusterResourcesReducer(initialState, startFetchingAction)).toEqual({
      ...initialState,

      isRetrieved: false,
      isRetrieving: true,
    });
  });
});
