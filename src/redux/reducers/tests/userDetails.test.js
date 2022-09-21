import userDetailReducer from "../userDetails";
import {
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_FAIL,
  START_GETTING_USER_DETAIL,
} from "../../actions/actionTypes";

const initialState = {
  user: {},
  isFetched: false,
  isFetching: false,
  message: "",
};

const fetchAction = {
  type: GET_USER_DETAIL_SUCCESS,
  user: undefined,
  isFetching: false,
  isFetched: true,
  message: "User detail fetched",
};

const fetchFailedAction = {
  type: GET_USER_DETAIL_FAIL,
  message: undefined,
  isFetching: false,
  isFetched: false,
};

const startFetchingAction = {
  type: START_GETTING_USER_DETAIL,
};
describe("userDetailReducer initial state", () => {
  it("should return the initial state", () => {
    expect(userDetailReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(userDetailReducer(initialState, fetchAction)).toEqual({
      user: undefined,
      isFetching: false,
      isFetched: true,
      message: "User detail fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(userDetailReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isFetching: false,
      isFetched: false,
      user: {},
    });
  });

  it("should handle adding database", () => {
    expect(userDetailReducer(initialState, startFetchingAction)).toEqual({
      user: {},
      isFetched: false,
      isFetching: true,
      message: "",
    });
  });
});
