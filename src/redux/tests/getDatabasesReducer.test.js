import {
  GETTING_ALL_DATABASES,
  ALL_DATABASES_SUCCESS,
  ALL_DATABASES_FAIL,
} from "../actions/actionTypes";
import databasesReducer from "../reducers/getDatabases";

const initialState = {
  databases: [],
  isFetchingDatabases: false,
  databasesFetched: false,
  databasesMessage: "Database information Not Available",
};

const getDatabasesSuccess = {
  type: ALL_DATABASES_SUCCESS,
  isFetchingDatabases: false,
};

const getDatabasesFail = {
  type: ALL_DATABASES_FAIL,
  isFetchingDatabases: false,
  databasesFetched: false,
};

const startFetchingAction = {
  type: GETTING_ALL_DATABASES,
  databasesFetched: false,
};

describe("add get getDatabases Reducer initial state", () => {
  it("should return the initial state", () => {
    expect(
      databasesReducer(
        {
          databases: [],
          isFetchingDatabases: false,
          databasesFetched: false,
          databasesMessage: "Database information Not Available",
        },
        {}
      )
    ).toEqual(initialState);
  });
  it("should handle  get create database SUCCESS", () => {
    expect(databasesReducer(initialState, getDatabasesSuccess)).toEqual({
      ...initialState,
      databases: undefined,
      databasesFetched: true,
      databasesMessage: "Fetched databases",
    });
  });

  it("should handle get  getDatabases FAIL", () => {
    expect(databasesReducer(initialState, getDatabasesFail)).toEqual({
      ...initialState,
      databasesMessage: "Error fetching databases",
    });
  });

  it("should handle getting  getDatabases STARTED", () => {
    expect(databasesReducer(initialState, startFetchingAction)).toEqual({
      ...initialState,
      isFetchingDatabases: true,
    });
  });
});
