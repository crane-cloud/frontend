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
  isCreated: true,
  isCreating: false,
};

const clusterResourcesFail = {
  type: CREATE_APP_FAIL,
  isCreated: false,
  isCreating: false,
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
          app: null,
          isCreated: false,
          isCreating: false,
          message: "",
          errorCode: null,
        },
        {}
      )
    ).toEqual(initialState);
  });
  it("should handle  get create app SUCCESS", () => {
    expect(createAppReducer(initialState, clusterResourcesSuccess)).toEqual({
      ...initialState,
      app: undefined,
      isCreating: false,
      isCreated: true,
      message: "Success! Your app has been deployed.",
      errorCode: null,
    });
  });

  it("should handle get  createApp FAIL", () => {
    expect(createAppReducer(initialState, clusterResourcesFail)).toEqual({
      ...initialState,
      app: null,
      isCreating: false,
      isCreated: false,
      message: "Deployment failed. Please try again",
      errorCode: undefined,
    });
  });

  it("should handle getting  createApp STARTED", () => {
    expect(createAppReducer(initialState, startFetchingAction)).toEqual({
      ...initialState,
      isCreating: true,
    });
  });

  it("should handle getting createApp cleared", () => {
    expect(createAppReducer(initialState, clearStateAction)).toEqual({
      ...initialState,
    });
  });
});
