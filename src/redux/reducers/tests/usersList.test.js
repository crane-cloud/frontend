import usersListReducer from "../usersList";
import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  START_GETTING_USERS,
} from "../../actions/actionTypes";

const initialState = {
  users: [],
  pagination:{},
  isFetched: false,
  isFetching: false,
  message: "No users yet.",
};

const fetchAction = {
  type: GET_USERS_SUCCESS,
  payload: {
    users: [],
    pagination:{},
  }
};

const fetchFailedAction = {
  type: GET_USERS_FAIL,
  message: undefined,
  isFetching: false,
  isFetched: false,
};

const startFetchingAction = {
  type: START_GETTING_USERS,
};
describe("usersListReducer initial state", () => {
  it("should return the initial state", () => {
    expect(usersListReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(usersListReducer(initialState, fetchAction)).toEqual({
      users: [],
      isFetching: false,
      pagination:{},
      isFetched: true,
      message: "Users successfully fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(usersListReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isFetching: false,
      isFetched: false,
      pagination:{},
      users: []
    });
  });

  it("should handle adding database", () => {
    expect(usersListReducer(initialState, startFetchingAction)).toEqual({
      users: [],
      isFetched: false,
      isFetching: true,
      pagination:{},
      message: "No users yet.",
    });
  });
});
