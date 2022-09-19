import addUserCreditsReducer from "../addCredits";
import {
  ADDING_USER_CREDITS,
  ADD_BETA_USER_CREDITS_SUCCESS,
  ADD_BETA_USER_CREDITS_FAIL,
  CLEAR_ADD_BETA_USER_CREDITS_STATE,
} from "../../actions/actionTypes";

const initialState = {
  Added: false,
  Failed: false,
  Adding: false,
  error: null,
  message: "",
};

const fetchAction = {
  type: ADD_BETA_USER_CREDITS_SUCCESS,
  payload: [{ cluster_id: 1, name: "testing" }],
  creatingCluster: false,
  isFailed: false,
  isAdded: true,
  message: "User credits added Successfully",
};

const fetchFailedAction = {
  type: ADD_BETA_USER_CREDITS_FAIL,
  isFailed: true,
  isAdded: false,
  creatingCluster: false,
  message: "Failed to add user credits",
};

const startFetchingAction = {
  type: ADDING_USER_CREDITS,
};

const clearAction = {
  type: CLEAR_ADD_BETA_USER_CREDITS_STATE,
}

describe("addUserCreditsReducer initial state", () => {
  it("should return the initial state", () => {
    expect(addUserCreditsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle cluster added", () => {
    expect(addUserCreditsReducer(initialState, fetchAction)).toEqual({
      error:null,
      message: "User credits added Successfully",
      Adding: false,
      Failed: false,
      Added: true,
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(addUserCreditsReducer(initialState, fetchFailedAction)).toEqual({
      Failed: true,
      Added: false,
      Adding: false,
      message: "Failed to add user credits",
      error: undefined
    });
  });

  it("should handle adding cluster", () => {
    expect(addUserCreditsReducer(initialState, startFetchingAction)).toEqual({
      Adding: true,
      Added: false,
      message: "",
      error: null,
      Failed: false,
    });
  });

  it("should handle clear adding cluster", () => {
    expect(addUserCreditsReducer(initialState, clearAction)).toEqual({
      Added: false,
      Failed: false,
      Adding: false,
      error: null,
      message: "",
    });
  });
});
