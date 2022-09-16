import addProjectReducer from "../addProject";
import {
  START_ADDING_PROJECT,
  CLEAR_ADD_PROJECT_STATE,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAILED,
} from "../../actions/actionTypes";

const initialState = {
  isAdded: false,
  isAdding: false,
  message: "",
  errorCode: null,
};

const fetchAction = {
  type: ADD_PROJECT_SUCCESS,
  project: { projectId: 1 },
  isFailed: false,
  isAdded: true,
  isAdding: false,
  errorCode: null,
  message: "Project Added SuccessFully",
};

const fetchFailedAction = {
  type: ADD_PROJECT_FAILED,
  isFailed: true,
  isAdded: false,
  isAdding: false,
  errorCode: "",
  message: "Failed to add Project",
};

const startFetchingAction = {
  type: START_ADDING_PROJECT,
};

const clearAction = {
  type: CLEAR_ADD_PROJECT_STATE,
};

describe("addProjectReducer initial state", () => {
  it("should return the initial state", () => {
    expect(addProjectReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle project added", () => {
    expect(addProjectReducer(initialState, fetchAction)).toEqual({
      message: "Project Added SuccessFully",
      project: undefined,
      isFailed: false,
      isAdded: true,
      isAdding: false,
      errorCode: null,
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(addProjectReducer(initialState, fetchFailedAction)).toEqual({
      isFailed: true,
      isAdded: false,
      isAdding: false,
      errorCode: undefined,
      message: "Failed to add Project",
    });
  });

  it("should handle adding project", () => {
    expect(addProjectReducer(initialState, startFetchingAction)).toEqual({
      isAdded: false,
      isAdding: true,
      errorCode: null,
      isFailed: false,
      message: ""
    });
  });

  it("should handle clear adding project", () => {
    expect(addProjectReducer(initialState, clearAction)).toEqual({
      isFailed: false,
      isAdded: false,
      isAdding: false,
      errorCode: null,
      message: "",
    });
  });
});
