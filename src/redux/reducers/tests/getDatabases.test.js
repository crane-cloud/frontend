import databasesReducer from "../getDatabases";
import {
  GETTING_ALL_DATABASES,
  ALL_DATABASES_SUCCESS,
  ALL_DATABASES_FAIL,
} from "../../actions/actionTypes";

const initialState = {
  databases: [],
  isFetchingDatabases: false,
  databasesFetched: false,
  databasesMessage: "Database information Not Available",
};

const fetchAction = {
  type: ALL_DATABASES_SUCCESS,
  databases: undefined,
  isFetchingDatabases: false,
  databasesFetched: true,
  databasesMessage: "Fetched databases",
};

const fetchFailedAction = {
  type: ALL_DATABASES_FAIL,
  isFetchingDatabases: false,
  databasesFetched: false,
  databasesMessage: "Error fetching databases",
};

const startFetchingAction = {
  type: GETTING_ALL_DATABASES,
};
describe("databasesReducer initial state", () => {
  it("should return the initial state", () => {
    expect(databasesReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(databasesReducer(initialState, fetchAction)).toEqual({
      databases: undefined,
      isFetchingDatabases: false,
      databasesFetched: true,
      databasesMessage: "Fetched databases",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(databasesReducer(initialState, fetchFailedAction)).toEqual({
      isFetchingDatabases: false,
      databasesFetched: false,
      databases: [],
      databasesMessage: "Error fetching databases",
    });
  });

  it("should handle adding database", () => {
    expect(databasesReducer(initialState, startFetchingAction)).toEqual({
      databases: [],
      isFetchingDatabases: true,
      databasesFetched: false,
      databasesMessage: "Database information Not Available",
    });
  });
});
