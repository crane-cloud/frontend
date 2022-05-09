import {
  ADMIN_GETTING_ALL_DATABASES,
  ADMIN_ALL_DATABASES_SUCCESS,
  ADMIN_ALL_DATABASES_FAIL,
} from "../actions/actionTypes";
import adminDatabasesReducer from "../reducers/adminGetDatabases";

const initialState = {
  databases: [],
  isFetchingDatabases: false,
  databasesFetched: false,
  databasesMessage: "Database information Not Available",
};

const adminGetDBs = {
  type: ADMIN_ALL_DATABASES_SUCCESS,
  isFetchingDatabases: false,
};

const getAdminDBFailed = {
  type: ADMIN_ALL_DATABASES_FAIL,
  isFetchingDatabases: false,
  databasesFetched: false,
};

const startFetchingAction = {
  type: ADMIN_GETTING_ALL_DATABASES,
};

describe("add get dbs Reducer initial state", () => {
  it("should return the initial state", () => {
    expect(
      adminDatabasesReducer(
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
  it("should handle ADMIN get DATABASE_SUCCESS", () => {
    expect(adminDatabasesReducer(initialState, adminGetDBs)).toEqual({
      ...initialState,
      databasesFetched: true,
      databasesMessage: "Fetched databases",
      databases: undefined,
    });
  });

  it("should handle get admin dbs FAIL", () => {
    expect(adminDatabasesReducer(initialState, getAdminDBFailed)).toEqual({
      ...initialState,
      databasesMessage: "Error fetching databases",
    });
  });

  it("should handle creating admin dbs STARTED", () => {
    expect(adminDatabasesReducer(initialState, startFetchingAction)).toEqual({
      ...initialState,
      databasesFetched: false,
      isFetchingDatabases: true,
    });
  });
});
