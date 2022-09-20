import updateAppReducer from "../updateApp";
import {
  START_UPDATING_APP,
  CLEAR_UPDATE_APP_STATE,
  UPDATE_APP_SUCCESS,
  UPDATE_APP_FAIL,
} from "../../actions/actionTypes";

const initialState = {
  isUpdated: false,
  isUpdating: false,
  errorMessage: "",
  errorCode: null,
};

const fetchAction = {
  type: UPDATE_APP_SUCCESS,
  app: undefined,
  isFailed: false,
  isUpdated: true,
  isUpdating: false,
  errorMessage: "",
  errorCode: null,
};

const fetchFailedAction = {
  type: UPDATE_APP_FAIL,
  message: undefined,
  isReverted: false,
  isReverting: false,
};

const startFetchingAction = {
  type: START_UPDATING_APP,
};
const clearAction = {
  type: CLEAR_UPDATE_APP_STATE,
};
describe("updateAppReducer initial state", () => {
  it("should return the initial state", () => {
    expect(updateAppReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(updateAppReducer(initialState, fetchAction)).toEqual({
      app: undefined,
      isFailed: false,
      isUpdated: true,
      isUpdating: false,
      errorMessage: "",
      errorCode: null,
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(updateAppReducer(initialState, fetchFailedAction)).toEqual({
      isFailed: true,
      isUpdated: false,
      isUpdating: false,
      errorCode: undefined,
      errorMessage: "Failed to update App",
    });
  });

  it("should handle adding database", () => {
    expect(updateAppReducer(initialState, startFetchingAction)).toEqual({
      isUpdated: false,
      isUpdating: true,
      errorMessage: "",
      errorCode: null,
      isFailed: false
    });
  });

  it("should handle clear adding database", () => {
    expect(updateAppReducer(initialState, clearAction)).toEqual({
      isUpdated: false,
      isUpdating: false,
      errorMessage: "",
      errorCode: null,
      isFailed: false
    });
  });
});
