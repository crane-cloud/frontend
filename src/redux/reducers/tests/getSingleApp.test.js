import singleAppReducer from "../getSingleApp";
import {
  GETTING_SINGLE_APP,
  SINGLE_APP_FAIL,
  SINGLE_APP_SUCCESS,
  CLEAR_FETCH_APP,
} from "../../actions/actionTypes";

const initialState = {
  app: [],
  isRetrieving: false,
  isFetched: false,
  message: "App Not Available",
};

const fetchAction = {
  type: SINGLE_APP_SUCCESS,
  app: undefined,
  isRetrieving: false,
  isFetched: true,
  message: "Single App fetched",
};

const fetchFailedAction = {
  type: SINGLE_APP_FAIL,
  message: undefined,
  isFetched: false,
  isRetrieving: false,
};

const startFetchingAction = {
  type: GETTING_SINGLE_APP,
};

const clearAction = {
  type: CLEAR_FETCH_APP,
};

describe("singleAppReducer initial state", () => {
  it("should return the initial state", () => {
    expect(singleAppReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle app added", () => {
    expect(singleAppReducer(initialState, fetchAction)).toEqual({
      app: undefined,
      isRetrieving: false,
      isFetched: true,
      message: "Single App fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(singleAppReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isFetched: false,
      isRetrieving: false,
      app: []
    });
  });

  it("should handle adding app", () => {
    expect(singleAppReducer(initialState, startFetchingAction)).toEqual({
      app: [],
  isRetrieving: true,
  isFetched: false,
  message: "App Not Available",
    });
  });

  it("should handle clear adding app", () => {
    expect(singleAppReducer(initialState, clearAction)).toEqual({
      app: [],
  isRetrieving: false,
  isFetched: false,
  message: "",
    });
  });
});
