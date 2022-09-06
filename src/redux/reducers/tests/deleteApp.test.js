import deleteAppReducer from "../deleteApp";
import {
  DELETE_APP_SUCCESS,
  DELETE_APP_FAIL,
  START_DELETING_APP,
  CLEAR_DELETE_APP_STATE,
} from "../../actions/actionTypes";

const initialState = {
  isDeleted: false,
  isDeleting: false,
  isFailed: false,
  message: "",
};

const fetchAction = {
  type: DELETE_APP_SUCCESS,
  isDeleting: false,
  isDeleted: true,
  isFailed: false,
  message: "App Deleted Successfully",
};

const fetchFailedAction = {
  type: DELETE_APP_FAIL,
  isDeleting: false,
  isDeleted: false,
  isFailed: true,
  message: "Failed to delete app. Please retry",
};

const startFetchingAction = {
  type: START_DELETING_APP,
};

const clearAction = {
  type: CLEAR_DELETE_APP_STATE,
};

describe("deleteAppReducer initial state", () => {
  it("should return the initial state", () => {
    expect(deleteAppReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle app added", () => {
    expect(deleteAppReducer(initialState, fetchAction)).toEqual({
      isDeleting: false,
      isDeleted: true,
      isFailed: false,
      message: "App Deleted Successfully",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(deleteAppReducer(initialState, fetchFailedAction)).toEqual({
      isDeleting: false,
      isDeleted: false,
      isFailed: true,
      message: "Failed to delete app. Please retry",
    });
  });

  it("should handle adding app", () => {
    expect(deleteAppReducer(initialState, startFetchingAction)).toEqual({
      isDeleted: false,
      isDeleting: true,
      isFailed: false,
      message: "",
    });
  });

  it("should handle clear adding app", () => {
    expect(deleteAppReducer(initialState, clearAction)).toEqual({
      isDeleted: false,
      isDeleting: false,
      isFailed: false,
      message: "",
    });
  });
});
