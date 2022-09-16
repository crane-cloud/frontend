import addBetaUserReducer from "../addBetaUser";
import {
  ADDING_BETA_USER,
  ADD_BETA_USER_SUCCESS,
  ADD_BETA_USER_FAIL,
} from "../../actions/actionTypes";

const initialState = {
  isAdded: false,
  isFailed: false,
  isAdding: false,
  user: null,
  error: null,
  message: "",
};

const fetchAction = {
  type: ADD_BETA_USER_SUCCESS,
  payload: [{ beta_user: true }],
  isAdding: false,
  isFailed: false,
  isAdded: true,
  message: "User Added Successfully",
};

const fetchFailedAction = {
  type: ADD_BETA_USER_FAIL,
  isFailed: true,
  isAdded: false,
  isAdding: false,
  message: "Failed to add user",
};

const startFetchingAction = {
  type: ADDING_BETA_USER,
};

describe("addBetaUserReducer initial state", () => {
  it("should return the initial state", () => {
    expect(addBetaUserReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle beta user added", () => {
    expect(addBetaUserReducer(initialState, fetchAction)).toEqual({
      error:null,
      user: [{ beta_user: true }],
      message: "User Added Successfully",
      isAdding: false,
      isFailed: false,
      isAdded: true,
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(addBetaUserReducer(initialState, fetchFailedAction)).toEqual({
      isFailed: true,
      isAdded: false,
      isAdding: false,
      message: "Failed to add user",
      error: undefined,
      user:null
    });
  });

  it("should handle adding beta user", () => {
    expect(addBetaUserReducer(initialState, startFetchingAction)).toEqual({
      isAdding: true,
      isAdded: false,
      message: "",
      error: null,
      user: null,
      isFailed: false
    });
  });
});
