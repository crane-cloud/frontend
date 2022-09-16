import passwordReducer from "../getPassword";
import {
  GETTING_PASSWORD,
  PASSWORD_FAIL,
  PASSWORD_SUCCESS,
  CLEAR_FETCH_PASSWORD,
} from "../../actions/actionTypes";

const initialState = {
  password: [],
  isRetrievingPassword: false,
  passwordFetched: false,
  message: "Database Not Available",
};

const fetchAction = {
  type: PASSWORD_SUCCESS,
  password: undefined,
  isRetrievingPassword: false,
  passwordFetched: true,
  message: "Password fetched",
};

const fetchFailedAction = {
  type: PASSWORD_FAIL,
  message: "",
  passwordFetched: false,
  isRetrievingPassword: false,
};

const startFetchingAction = {
  type: GETTING_PASSWORD,
};

const clearAction = {
  type: CLEAR_FETCH_PASSWORD,
};

describe("passwordReducer initial state", () => {
  it("should return the initial state", () => {
    expect(passwordReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(passwordReducer(initialState, fetchAction)).toEqual({
      password: undefined,
      isRetrievingPassword: false,
      passwordFetched: true,
      message: "Password fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(passwordReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      passwordFetched: false,
      password: [],
      isRetrievingPassword: false,
    });
  });

  it("should handle adding database", () => {
    expect(passwordReducer(initialState, startFetchingAction)).toEqual({
      password: [],
      isRetrievingPassword: true,
      passwordFetched: false,
      message: "Database Not Available",
    });
  });

  it("should handle clear adding database", () => {
    expect(passwordReducer(initialState, clearAction)).toEqual({
      password: [],
      isRetrievingPassword: false,
      passwordFetched: false,
      message: "",
    });
  });
});
