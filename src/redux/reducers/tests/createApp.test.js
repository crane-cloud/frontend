import createAppReducer from "../createApp";
import {
  CREATE_APP_SUCCESS,
  CREATE_APP_FAIL,
  START_CREATING_APP,
  CLEAR_ADD_APP_STATE,
} from "../../actions/actionTypes";

const initialState = {
  app: null,
  isCreated: false,
  isCreating: false,
  message: "",
  errorCode: null,
};

const fetchAction = {
  type: CREATE_APP_SUCCESS,
  app: undefined,
  isCreating: false,
  isCreated: true,
  message: "Success! Your app has been deployed.",
  errorCode: null,
};

const fetchFailedAction = {
  type: CREATE_APP_FAIL,
  app: null,
  isCreating: false,
  isCreated: false,
  message: "Deployment failed. Please try again",
  errorCode: undefined,
};

const startFetchingAction = {
  type: START_CREATING_APP,
};

const clearAction = {
  type: CLEAR_ADD_APP_STATE,
};

describe("createAppReducer initial state", () => {
  it("should return the initial state", () => {
    expect(createAppReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle app added", () => {
    expect(createAppReducer(initialState, fetchAction)).toEqual({
      app: undefined,
      isCreating: false,
      isCreated: true,
      message: "Success! Your app has been deployed.",
      errorCode: null,
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(createAppReducer(initialState, fetchFailedAction)).toEqual({
      app: null,
      isCreating: false,
      isCreated: false,
      message: "Deployment failed. Please try again",
      errorCode: undefined,
    });
  });

  it("should handle adding app", () => {
    expect(createAppReducer(initialState, startFetchingAction)).toEqual({
      app: null,
      isCreating: true,
      isCreated: false,
      message: "",
      errorCode: null,
    });
  });

  it("should handle clear adding app", () => {
    expect(createAppReducer(initialState, clearAction)).toEqual({
      app: null,
      isCreated: false,
      isCreating: false,
      message: "",
      errorCode: null,
    });
  });
});
