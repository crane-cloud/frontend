import namespacesListReducer from "../namespacesList";
import {
  IS_FETCHING,
  FETCH_NAMESPACES_SUCCESS,
  FETCH_NAMESPACES_FAILED,
} from "../../actions/actionTypes";

const initialState = {
  namespacesList: [],
  isRetrieving: false,
  isRetrieved: false,
  message: "No Namespaces Available",
};

const fetchAction = {
  type: FETCH_NAMESPACES_SUCCESS,
  namespacesList: undefined,
  isRetrieving: false,
  isRetrieved: true,
  message: "All Namespaces in this Cluster fetched",
};

const fetchFailedAction = {
  type: FETCH_NAMESPACES_FAILED,
  message: undefined,
  isRetrieved: false,
  isRetrieving: false,
};

const startFetchingAction = {
  type: IS_FETCHING,
};
describe("namespacesListReducer initial state", () => {
  it("should return the initial state", () => {
    expect(namespacesListReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle namespacesList added", () => {
    expect(namespacesListReducer(initialState, fetchAction)).toEqual({
      namespacesList: undefined,
      isRetrieving: false,
      isRetrieved: true,
      message: "All Namespaces in this Cluster fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(namespacesListReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isRetrieved: true,
      isRetrieving: false,
      namespacesList: [],
    });
  });

  it("should handle adding namespacesList", () => {
    expect(namespacesListReducer(initialState, startFetchingAction)).toEqual({
      namespacesList: [],
      isRetrieving: true,
      isRetrieved: false,
      message: "No Namespaces Available",
    });
  });
});
