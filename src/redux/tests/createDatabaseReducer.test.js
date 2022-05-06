import {
  CREATE_DATABASE_SUCCESS,
  CREATE_DATABASE_FAIL,
  START_CREATING_DATABASE,
  CLEAR_ADD_DATABASE_STATE,
} from "../actions/actionTypes";
import createDatabaseReducer from "../reducers/createDatabase";

const initialState = {
  database: null,
  isCreated: false,
  isCreating: false,
  message: "",
  errorCode: null,
};

const clusterResourcesSuccess = {
  type: CREATE_DATABASE_SUCCESS,
  database: "action.payload",
  isCreating: false,
  isCreated: true,
  message: "Success! Your database has been created.",
  errorCode: null,
};

const clusterResourcesFail = {
  type: CREATE_DATABASE_FAIL,
  database: null,
  isCreating: false,
  isCreated: false,
  message: "Failed to create database. Please try again",
  errorCode: "action.payload?.errorCode",
};

const startFetchingAction = {
  type: START_CREATING_DATABASE,
  database: null,
  isCreating: true,
  isCreated: false,
  message: "",
  errorCode: null,
};

const clearStateAction = {
  type: CLEAR_ADD_DATABASE_STATE,
};

describe("add get createDatabase Reducer initial state", () => {
  it("should return the initial state", () => {
    expect(
      createDatabaseReducer(
        {
          database: null,
          isCreated: false,
          isCreating: false,
          message: "",
          errorCode: null,
        },
        {}
      )
    ).toEqual(initialState);
  });
  it("should handle  get create database SUCCESS", () => {
    expect(createDatabaseReducer(initialState, clusterResourcesSuccess)).toEqual({
      ...initialState,
      database: undefined,
      isCreating: false,
      isCreated: true,
      message: "Success! Your database has been created.",
      errorCode: null,
    });
  });

  it("should handle get  createDatabase FAIL", () => {
    expect(createDatabaseReducer(initialState, clusterResourcesFail)).toEqual({
      ...initialState,
      database: null,
      isCreating: false,
      isCreated: false,
      message: "Failed to create database. Please try again",
      errorCode: undefined,
    });
  });

  it("should handle getting  createDatabase STARTED", () => {
    expect(createDatabaseReducer(initialState, startFetchingAction)).toEqual({
      ...initialState,
      isCreating: true,
    });
  });

  it("should handle getting createDatabase cleared", () => {
    expect(createDatabaseReducer(initialState, clearStateAction)).toEqual({
      ...initialState,
    });
  });
});
