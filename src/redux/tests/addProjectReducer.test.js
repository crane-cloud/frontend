import {
  START_ADDING_PROJECT,
  CLEAR_ADD_PROJECT_STATE,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAILED,
} from "../actions/actionTypes";
import addProjectReducer from "../reducers/addProject";

const initialState = {
  isAdded: false,
  isAdding: false,
  message: "",
  // errorCode: null,
};

const postCluster = {
  type: ADD_PROJECT_SUCCESS,
  project: "action.payload",
  isFailed: false,
  isAdded: true,
  isAdding: false,
  message: "Project Added SuccessFully",
  errorCode: null,
};

const postClusterFailedAction = {
  type: ADD_PROJECT_FAILED,
  error: "action.payload.error",
};

const startFetchingAction = {
  type: START_ADDING_PROJECT,
};

describe("addProjectReducer initial state", () => {
  it("should return the initial state", () => {
    expect(
      addProjectReducer(
        {
          isAdded: false,
          isAdding: false,
          message: "",
          // errorCode: null,
        },
        {}
      )
    ).toEqual(initialState);
  });

  it("should handle ADD_PROJECT_SUCCESS", () => {
    expect(addProjectReducer(initialState, postCluster)).toEqual({
      ...initialState,
      project: undefined,
      isFailed: false,
      isAdded: true,
      isAdding: false,
      message: "Project Added SuccessFully",
      errorCode: null,
    });
  });

  it("should handle add project FAIL", () => {
    expect(addProjectReducer(initialState, postClusterFailedAction)).toEqual({
      ...initialState,
      isFailed: true,
      isAdded: false,
      isAdding: false,
      message: "Failed to add Project",
    });
  });

  it("should handle POSTING_STARTED", () => {
    expect(addProjectReducer(initialState, startFetchingAction)).toEqual({
      ...initialState,
      isAdded: false,
      isAdding: true,
      errorCode: null,
      isFailed: false,
    });
  });
});
