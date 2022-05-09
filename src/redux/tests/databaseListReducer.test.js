import {
  FETCH_PROJECT_DATABASES_SUCCESS,
  FETCH_PROJECT_DATABASES_FAILED,
  IS_FETCHING_PROJECT_DATABASES,
  CLEAR_PROJECT_DATABASES,
} from "../actions/actionTypes";
import projectDatabasesReducer from "../reducers/databaseList";

const initialState = {
  databases: [],
  isFetchingDatabases: false,
  databasesFetched: false,
  databasesMessage: "Databases Not Available",
};

const clusterResourcesSuccess = {
  type: FETCH_PROJECT_DATABASES_SUCCESS,
  isFetchingDatabases: false,
};

const clusterResourcesFail = {
  type: FETCH_PROJECT_DATABASES_FAILED,
  isFetchingDatabases: false,
  databasesFetched: false,
};

const startFetchingAction = {
  type: IS_FETCHING_PROJECT_DATABASES,
  databasesFetched: false,
};

const clearStateAction = {
  type: CLEAR_PROJECT_DATABASES,
  databases: [],
  isFetchingDatabases: false,
  databasesFetched: false,
};

describe("add get projectDatabase Reducer initial state", () => {
  it("should return the initial state", () => {
    expect(
      projectDatabasesReducer(
        {
          databases: [],
          isFetchingDatabases: false,
          databasesFetched: false,
          databasesMessage: "Databases Not Available",
        },
        {}
      )
    ).toEqual(initialState);
  });
  it("should handle  get create database SUCCESS", () => {
    expect(
      projectDatabasesReducer(initialState, clusterResourcesSuccess)
    ).toEqual({
      ...initialState,
      databases: undefined,
      databasesFetched: true,
      databasesMessage: "Fetched project databases",
    });
  });

  it("should handle get  projectDatabase FAIL", () => {
    expect(projectDatabasesReducer(initialState, clusterResourcesFail)).toEqual(
      {
        ...initialState,
        databasesMessage: "Error fetching project databases",
      }
    );
  });

  it("should handle getting  projectDatabase STARTED", () => {
    expect(projectDatabasesReducer(initialState, startFetchingAction)).toEqual({
      ...initialState,
      isFetchingDatabases: true,
    });
  });

  it("should handle getting projectDatabase cleared", () => {
    expect(projectDatabasesReducer(initialState, clearStateAction)).toEqual({
      ...initialState,
      databasesMessage: "",
    });
  });
});
