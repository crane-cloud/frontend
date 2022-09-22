import revertUrlReducer from "../revertUrl";
import {
  REVERT_FAIL,
  REVERT_SUCCESS,
  REVERTING_URL,
  CLEAR_REVERT_STATE,
} from "../../actions/actionTypes";

const initialState = {
  app: [],
  isReverting: false,
  isReverted: false,
  message: "",
};

const fetchAction = {
  type: REVERT_SUCCESS,
  app: undefined,
  isReverting: false,
  isReverted: true,
  message: "App url has been reverted",
};

const fetchFailedAction = {
  type: REVERT_FAIL,
  message: undefined,
  isReverted: false,
  isReverting: false,
};

const startFetchingAction = {
  type: REVERTING_URL,
};

const clearAction = {
  type: CLEAR_REVERT_STATE,
};

describe("revertUrlReducer initial state", () => {
  it("should return the initial state", () => {
    expect(revertUrlReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(revertUrlReducer(initialState, fetchAction)).toEqual({
      app: undefined,
      isReverting: false,
      isReverted: true,
      message: "App url has been reverted",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(revertUrlReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isReverted: false,
      isReverting: false,
      app: []
    });
  });

  it("should handle adding database", () => {
    expect(revertUrlReducer(initialState, startFetchingAction)).toEqual({
      app: [],
      isReverting: true,
      isReverted: false,
      message: "",
    });
  });

  it("should handle clear adding database", () => {
    expect(revertUrlReducer(initialState, clearAction)).toEqual({
      app: [],
      isReverting: false,
      isReverted: false,
      message: "",
    });
  });
});
