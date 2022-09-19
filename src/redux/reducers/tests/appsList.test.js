import appsListReducer from "../appsList";
import {
  GET_APPS_SUCCESS,
  GET_APPS_FAIL,
  START_GETTING_APPS,
} from "../../actions/actionTypes";

const initialState = {
  apps: {apps:[]},
  isRetrieved: false,
  isRetrieving: false,
  message: "Apps Not Available",
};

const fetchAction = {
  type: GET_APPS_SUCCESS,
  apps: {apps:[]},
  isRetrieving: false,
  isRetrieved: true,
  message: "All Apps fetched",
};

const fetchFailedAction = {
  type: GET_APPS_FAIL,
  error: undefined,
  isRetrieving: false,
  isRetrieved: false,
};

const startFetchingAction = {
  type: START_GETTING_APPS,
};

describe("appsListReducer initial state", () => {
  it("should return the initial state", () => {
    expect(appsListReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(appsListReducer(initialState, fetchAction)).toEqual({
      apps: undefined,
      isRetrieving: false,
      isRetrieved: true,
      message: "All Apps fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(appsListReducer(initialState, fetchFailedAction)).toEqual({
      error: undefined,
      isRetrieving: false,
      isRetrieved: false,
      apps: {apps:[]},
      message: "Apps Not Available"
    });
  });

  it("should handle adding database", () => {
    expect(appsListReducer(initialState, startFetchingAction)).toEqual({
      isRetrieved: false,
      isRetrieving: true,
      apps: {apps:[]},
      message: "Apps Not Available"
    });
  });
});
