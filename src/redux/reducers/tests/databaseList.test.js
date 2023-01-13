import projectDatabasesReducer from "../databaseList";
import {
  FETCH_PROJECT_DATABASES_SUCCESS,
  FETCH_PROJECT_DATABASES_FAILED,
  IS_FETCHING_PROJECT_DATABASES,
  CLEAR_PROJECT_DATABASES,
} from "../../actions/actionTypes";

const initialState = {
  databases: [],
  isFetchingDatabases: false,
  databasesFetched: false,
  databasesMessage: "Databases Not Available",
};

const fetchAction = {
  type: FETCH_PROJECT_DATABASES_SUCCESS,
  databases: undefined,
  isFetchingDatabases: false,
  databasesFetched: true,
  databasesMessage: "Fetched project databases",
};

const fetchFailedAction = {
  type: FETCH_PROJECT_DATABASES_FAILED,
  isFetchingDatabases: false,
  databasesFetched: false,
  databasesMessage: "Error fetching project databases",
};

const startFetchingAction = {
  type: IS_FETCHING_PROJECT_DATABASES,
};

const clearAction = {
  type: CLEAR_PROJECT_DATABASES,
};

describe("projectDatabasesReducer initial state", () => {
  it("should return the initial state", () => {
    expect(projectDatabasesReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(projectDatabasesReducer(initialState, fetchAction)).toEqual({
      databases: undefined,
      isFetchingDatabases: false,
      databasesFetched: true,
      databasesMessage: "Fetched project databases",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(projectDatabasesReducer(initialState, fetchFailedAction)).toEqual({
      isFetchingDatabases: false,
      databasesFetched: false,
      databases: [],
      databasesMessage: "Error fetching project databases",
    });
  });

  it("should handle adding database", () => {
    expect(projectDatabasesReducer(initialState, startFetchingAction)).toEqual({
      databases: [],
      isFetchingDatabases: true,
      databasesFetched: false,
      databasesMessage: "Databases Not Available",
    });
  });

  it("should handle clear adding database", () => {
    expect(projectDatabasesReducer(initialState, clearAction)).toEqual({
      databases: [],
      isFetchingDatabases: false,
      databasesFetched: false,
      databasesMessage: "",
    });
  });
});
