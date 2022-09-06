import adminGetUserCreditsReducer from "../adminGetUserCredits";
import {
  ADMIN_GET_USER_CREDITS_FAIL,
  ADMIN_GET_USER_CREDITS_SUCCESS,
  ADMIN_GETTING_USER_CREDITS,
  ADMIN_CLEAR_USER_CREDITS,
} from "../../actions/actionTypes";

const initialState = {
  userCredits: [],
  creditsFetched: false,
  isFetchingCredits: false,
  message: "",
};

const fetchAction = {
  type: ADMIN_GET_USER_CREDITS_SUCCESS,
  userCredits: [],
  isFetchingCredits: false,
  creditsFetched: true,
  message: "User credits fetched",
};

const fetchFailedAction = {
  type: ADMIN_GET_USER_CREDITS_FAIL,
  message: [],
  isFetchingCredits: false,
  creditsFetched: false,
};

const startFetchingAction = {
  type: ADMIN_GETTING_USER_CREDITS,
};

const clearAction = {
  type: ADMIN_CLEAR_USER_CREDITS,
}

describe("adminGetUserCreditsReducer initial state", () => {
  it("should return the initial state", () => {
    expect(adminGetUserCreditsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle cluster added", () => {
    expect(adminGetUserCreditsReducer(initialState, fetchAction)).toEqual({
      userCredits: undefined,
      isFetchingCredits: false,
      creditsFetched: true,
      message: "User credits fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(adminGetUserCreditsReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isFetchingCredits: false,
      creditsFetched: false,
      userCredits: []
    });
  });

  it("should handle adding cluster", () => {
    expect(adminGetUserCreditsReducer(initialState, startFetchingAction)).toEqual({
      isFetchingCredits: true,
      creditsFetched: false,
      message: "",
      userCredits: []
    });
  });

  it("should handle clear adding cluster", () => {
    expect(adminGetUserCreditsReducer(initialState, clearAction)).toEqual({
      userCredits: [],
      isFetchingCredits: false,
      creditsFetched: false,
      message: "",
    });
  });
});
