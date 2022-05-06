import {
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  START_DELETING_PROJECT,
  CLEAR_DELETE_PROJECT_STATE,
} from "../actions/actionTypes";
import deleteProjectReducer from "../reducers/deleteProject";

const initialState = {
  project: null,
  isDeleted: false,
  isDeleting: false,
  message: "",
  isFailed: false,
};

const deleteProjectSuccess = {
  type: DELETE_PROJECT_SUCCESS,
  isDeleting: false,
  isFailed: false,
};

const deleteProjectFail = {
  type: DELETE_PROJECT_FAIL,
  isDeleting: false,
  isDeleted: false,
};

const startFetchingAction = {
  type: START_DELETING_PROJECT,
  isDeleted: false,
  isFailed: false,
};

const clearStateAction = {
  type: CLEAR_DELETE_PROJECT_STATE,
  isDeleted: false,
  isDeleting: false,
  isFailed: false,
  message: "",
};

describe("add get deleteProject Reducer initial state", () => {
  it("should return the initial state", () => {
    expect(
      deleteProjectReducer(
        {
          project: null,
          isDeleted: false,
          isDeleting: false,
          message: "",
          isFailed: false,
        },
        {}
      )
    ).toEqual(initialState);
  });
  it("should handle  get create database SUCCESS", () => {
    expect(deleteProjectReducer(initialState, deleteProjectSuccess)).toEqual({
      ...initialState,
      project: undefined,
      isDeleted: true,
      message: "Project has been Deleted.",
    });
  });

  it("should handle get  deleteProject FAIL", () => {
    expect(deleteProjectReducer(initialState, deleteProjectFail)).toEqual({
      ...initialState,
      message: "Failed to delete project. Please try again.",
      isFailed: true,
    });
  });

  it("should handle getting  deleteProject STARTED", () => {
    expect(deleteProjectReducer(initialState, startFetchingAction)).toEqual({
      ...initialState,
      isDeleting: true,
    });
  });

  it("should handle getting deleteProject cleared", () => {
    expect(deleteProjectReducer(initialState, clearStateAction)).toEqual({
      ...initialState,
    });
  });
});
