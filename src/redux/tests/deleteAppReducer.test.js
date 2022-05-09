import {
  DELETE_APP_SUCCESS,
  DELETE_APP_FAIL,
  START_DELETING_APP,
  CLEAR_DELETE_APP_STATE,
} from "../actions/actionTypes";
import deleteAppReducer from "../reducers/deleteApp";

const initialState = {
  isDeleted: false,
  isDeleting: false,
  isFailed: false,
  message: "",
};

const deleteAppSuccess = {
  type: DELETE_APP_SUCCESS,
  isDeleting: false,
  isFailed: false,
};

const deleteAppFail = {
  type: DELETE_APP_FAIL,
  isDeleting: false,
  isDeleted: false,
};

const startFetchingAction = {
  type: START_DELETING_APP,
  isDeleting: true,
  isDeleted: false,
  isFailed: false,
  message: "",
};

const clearStateAction = {
  type: CLEAR_DELETE_APP_STATE,
  isDeleted: false,
  isDeleting: false,
  isFailed: false,
  message: "",
};

describe("add get deleteApp Reducer initial state", () => {
  it("should return the initial state", () => {
    expect(
      deleteAppReducer(
        {
          isDeleted: false,
          isDeleting: false,
          isFailed: false,
          message: "",
        },
        {}
      )
    ).toEqual(initialState);
  });
  it("should handle  get create database SUCCESS", () => {
    expect(deleteAppReducer(initialState, deleteAppSuccess)).toEqual({
      ...initialState,
      message: "App Deleted Successfully",
      isDeleted: true,
    });
  });

  it("should handle get  deleteApp FAIL", () => {
    expect(deleteAppReducer(initialState, deleteAppFail)).toEqual({
      ...initialState,
      isFailed: true,
      message: "Failed to delete app. Please retry",
    });
  });

  it("should handle getting  deleteApp STARTED", () => {
    expect(deleteAppReducer(initialState, startFetchingAction)).toEqual({
      ...initialState,
      isDeleting: true,
    });
  });

  it("should handle getting deleteApp cleared", () => {
    expect(deleteAppReducer(initialState, clearStateAction)).toEqual({
      ...initialState,
    });
  });
});
