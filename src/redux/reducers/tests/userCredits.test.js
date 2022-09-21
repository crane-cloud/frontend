import userCreditsReducer from "../userCredits";
import {
  GETTING_USER_CREDITS,
  GET_USER_CREDITS_FAIL,
  GET_USER_CREDITS_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  credits: [],
  isFetchedCredits: false,
  isFetchingCredits: false,
  message: "",
};

const fetchAction = {
  type: GET_USER_CREDITS_SUCCESS,
  credits: undefined,
  isFetchingCredits: false,
  isFetchedCredits: true,
  message: "User credits fetched",
};

const fetchFailedAction = {
  type: GET_USER_CREDITS_FAIL,
  message: undefined,
  isFetchingCredits: false,
  isFetchedCredits: false,
};

const startFetchingAction = {
  type: GETTING_USER_CREDITS,
};
describe("userCreditsReducer initial state", () => {
  it("should return the initial state", () => {
    expect(userCreditsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(userCreditsReducer(initialState, fetchAction)).toEqual({
      credits: undefined,
      isFetchingCredits: false,
      isFetchedCredits: true,
      message: "User credits fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(userCreditsReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isFetchingCredits: false,
      isFetchedCredits: false,
      credits: []
    });
  });

  it("should handle adding database", () => {
    expect(userCreditsReducer(initialState, startFetchingAction)).toEqual({
      credits: [],
      isFetchedCredits: false,
      isFetchingCredits: true,
      message: "",
    });
  });
});
