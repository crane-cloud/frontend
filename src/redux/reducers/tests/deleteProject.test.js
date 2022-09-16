import deleteProjectReducer from "../deleteProject";
import {
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  START_DELETING_PROJECT,
  CLEAR_DELETE_PROJECT_STATE,
} from "../../actions/actionTypes";

const initialState = {
  project: null,
  isDeleted: false,
  isDeleting: false,
  message: "",
  isFailed: false,
};

const fetchAction = {
  type: DELETE_PROJECT_SUCCESS,
  project: undefined,
  isDeleting: false,
  isDeleted: true,
  isFailed: false,
  message: "Project has been Deleted.",
};

const fetchFailedAction = {
  type: DELETE_PROJECT_FAIL,
  message: "Failed to delete project. Please try again.",
  isDeleting: false,
  isDeleted: false,
  isFailed: true,
};

const startFetchingAction = {
  type: START_DELETING_PROJECT,
};

const clearAction = {
  type: CLEAR_DELETE_PROJECT_STATE,
};

describe("deleteProjectReducer initial state", () => {
  it("should return the initial state", () => {
    expect(deleteProjectReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(deleteProjectReducer(initialState, fetchAction)).toEqual({
      project: undefined,
      isDeleting: false,
      isDeleted: true,
      isFailed: false,
      message: "Project has been Deleted.",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(deleteProjectReducer(initialState, fetchFailedAction)).toEqual({
      message: "Failed to delete project. Please try again.",
      isDeleting: false,
      isDeleted: false,
      isFailed: true,
      project: null
    });
  });

  it("should handle adding database", () => {
    expect(deleteProjectReducer(initialState, startFetchingAction)).toEqual({
      isDeleting: true,
      isDeleted: false,
      isFailed: false,
      project: null,
      message: ""
    });
  });

  it("should handle clear adding database", () => {
    expect(deleteProjectReducer(initialState, clearAction)).toEqual({
      project: null,
      isDeleted: false,
      isDeleting: false,
      message: "",
      isFailed: false,
    });
  });
});
