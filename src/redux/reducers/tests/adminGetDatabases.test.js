import adminDatabasesReducer from "../adminGetDatabases";
import {
  ADMIN_GETTING_ALL_DATABASES,
  ADMIN_ALL_DATABASES_SUCCESS,
  ADMIN_ALL_DATABASES_FAIL,
} from "../../actions/actionTypes";

const initialState = {
  databases: [],
  isFetchingDatabases: false,
  databasesFetched: false,
  databasesMessage: "Database information Not Available",
};

const fetchAction = {
  type: ADMIN_ALL_DATABASES_SUCCESS,
  databases: undefined,
  isFetchingDatabases: false,
  databasesFetched: true,
  databasesMessage: "Fetched databases",
};

const fetchFailedAction = {
  type: ADMIN_ALL_DATABASES_FAIL,
  isFetchingDatabases: false,
  databasesFetched: false,
  databasesMessage: "Error fetching databases",
};

const startFetchingAction = {
  type: ADMIN_GETTING_ALL_DATABASES,
};

describe("adminDatabasesReducer initial state", () => {
  it("should return the initial state", () => {
    expect(adminDatabasesReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(adminDatabasesReducer(initialState, fetchAction)).toEqual({
      databases: undefined,
      isFetchingDatabases: false,
      databasesFetched: true,
      databasesMessage: "Fetched databases",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(adminDatabasesReducer(initialState, fetchFailedAction)).toEqual({
      isFetchingDatabases: false,
      databasesFetched: false,
      databasesMessage: "Error fetching databases",
      databases: []
    });
  });

  it("should handle adding database", () => {
    expect(adminDatabasesReducer(initialState, startFetchingAction)).toEqual({
      databasesFetched: false,
      isFetchingDatabases: true,
      databases: [],
      databasesMessage: "Database information Not Available"
    });
  });
});
