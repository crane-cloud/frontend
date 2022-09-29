import storageClassesReducer from "../storageClass";
import {
  START_GETTING_STORAGE_CLASS,
  GET_STORAGE_CLASS_FAIL,
  GET_STORAGE_CLASS_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  storageClasses: {},
  isFetched: false,
  isRetrieving: false,
  message: "Storage Classes Not Available",
};

const fetchAction = {
  type: GET_STORAGE_CLASS_SUCCESS,
  app: undefined,
  isReverting: false,
  isReverted: true,
  message: "App url has been reverted",
};

const fetchFailedAction = {
  type: GET_STORAGE_CLASS_FAIL,
  message: undefined,
  isReverted: false,
  isReverting: false,
};

const startFetchingAction = {
  type: START_GETTING_STORAGE_CLASS,
};
describe("storageClassesReducer initial state", () => {
  it("should return the initial state", () => {
    expect(storageClassesReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(storageClassesReducer(initialState, fetchAction)).toEqual({
      storageClasses: undefined,
      isFetched: true,
      isRetrieving: false,
      message: "All Storage Classes fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(storageClassesReducer(initialState, fetchFailedAction)).toEqual({
      isFetched: false,
      message: undefined,
      isRetrieving: false,
      storageClasses: {},
    });
  });

  it("should handle adding database", () => {
    expect(storageClassesReducer(initialState, startFetchingAction)).toEqual({
      storageClasses: {},
      isFetched: false,
      isRetrieving: true,
      message: "Storage Classes Not Available",
    });
  });
});
