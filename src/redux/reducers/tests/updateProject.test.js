import updateProjectReducer from "../updateProject";
import {
  START_UPDATING_PROJECT,
  CLEAR_UPDATE_PROJECT_STATE,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILED,
} from "../../actions/actionTypes";

const initialState = {
  isUpdated: false,
  isUpdating: false,
  errorMessage: "",
  errorCode: null,
};

const fetchAction = {
  type: UPDATE_PROJECT_SUCCESS,
  project: undefined,
  isFailed: false,
  isUpdated: true,
  isUpdating: false,
  errorMessage: "",
  errorCode: null,
};

const fetchFailedAction = {
  type: UPDATE_PROJECT_FAILED,
  isFailed: true,
  isUpdated: false,
  isUpdating: false,
  errorCode: undefined,
  errorMessage: "Failed to update Project",
};

const startFetchingAction = {
  type: START_UPDATING_PROJECT,
};
const clearAction = {
  type: CLEAR_UPDATE_PROJECT_STATE,
};
describe("updateProjectReducer initial state", () => {
  it("should return the initial state", () => {
    expect(updateProjectReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(updateProjectReducer(initialState, fetchAction)).toEqual({
      project: undefined,
      isFailed: false,
      isUpdated: true,
      isUpdating: false,
      errorMessage: "",
      errorCode: null,
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(updateProjectReducer(initialState, fetchFailedAction)).toEqual({
      isFailed: true,
      isUpdated: false,
      isUpdating: false,
      errorCode: undefined,
      errorMessage: "Failed to update Project",
    });
  });

  it("should handle adding database", () => {
    expect(updateProjectReducer(initialState, startFetchingAction)).toEqual({
      isUpdated: false,
      isUpdating: true,
      errorMessage: "",
      errorCode: null,
      isFailed: false,
    });
  });

  it("should handle clear adding database", () => {
    expect(updateProjectReducer(initialState, clearAction)).toEqual({
      isUpdated: false,
      isUpdating: false,
      errorMessage: "",
      errorCode: null,
      isFailed: false
    });
  });
});
