import {
  CREATE_APP_SUCCESS,
  CREATE_APP_FAIL,
  START_CREATING_APP,
  CLEAR_ADD_APP_STATE,
} from "../actions/actionTypes";
import createAppReducer from "../reducers/createApp";

const initialState = {
  app: null,
  isCreated: false,
  isCreating: false,
  message: "",
  errorCode: null,
};

const clusterResourcesSuccess = {
  type: CREATE_APP_SUCCESS,
  isRetrieving: false,
  isRetrieved: true,
};

const clusterResourcesFail = {
  type: CREATE_APP_FAIL,
  FetchedAppsSummary: false,
  isFetchingAppsSummary: false,
  errorCode: "action.payload.errorCode",
};

const startFetchingAction = {
  type: START_CREATING_APP,
};

const clearStateAction = {
  type: CLEAR_ADD_APP_STATE,
};

describe("add get createApp Reducer initial state", () => {
  it("should return the initial state", () => {
    expect(
      createAppReducer(
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
    expect(createAppReducer(initialState, clusterResourcesSuccess)).toEqual({
      ...initialState,
      resourceCount: undefined,
      message: "All Cluster fetched",
      clusterName: undefined,
      isRetrieved: true,
      clusters: undefined,
    });
  });

  it("should handle get  createApp FAIL", () => {
    expect(createAppReducer(initialState, clusterResourcesFail)).toEqual({
      ...initialState,
      message: undefined,
      isRetrieved: false,
      isRetrieving: false,
    });
  });

  it("should handle getting  createApp STARTED", () => {
    expect(createAppReducer(initialState, startFetchingAction)).toEqual({
      ...initialState,
      isRetrieving: true,
    });
  });
});
