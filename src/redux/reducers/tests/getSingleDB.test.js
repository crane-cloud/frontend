import singleDBReducer from "../getSingleDB";
import {
  GETTING_SINGLE_DATABASE,
  SINGLE_DATABASE_FAIL,
  SINGLE_DATABASE_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  database: [],
  isRetrieving: false,
  isFetched: false,
  message: "Database Not Available",
};

const fetchAction = {
  type: SINGLE_DATABASE_SUCCESS,
  database: undefined,
  isRetrieving: false,
  isFetched: true,
  message: "Single DB fetched",
};

const fetchFailedAction = {
  type: SINGLE_DATABASE_FAIL,
  message: undefined,
  isFetched: false,
  isRetrieving: false,
};

const startFetchingAction = {
  type: GETTING_SINGLE_DATABASE,
};
describe("singleDBReducer initial state", () => {
  it("should return the initial state", () => {
    expect(singleDBReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(singleDBReducer(initialState, fetchAction)).toEqual({
      database: undefined,
      isRetrieving: false,
      isFetched: true,
      message: "Single DB fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(singleDBReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isFetched: false,
      isRetrieving: false,
      database: []
    });
  });

  it("should handle adding database", () => {
    expect(singleDBReducer(initialState, startFetchingAction)).toEqual({
      database: [],
  isRetrieving: true,
  isFetched: false,
  message: "Database Not Available",
    });
  });
});
