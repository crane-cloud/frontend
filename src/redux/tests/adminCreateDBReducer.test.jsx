import {
  ADMIN_CREATE_DATABASE_SUCCESS,
  ADMIN_CREATE_DATABASE_FAIL,
  ADMIN_START_CREATING_DATABASE,
} from "../actions/actionTypes";
import adminCreateDBReducer from "../reducers/adminCreateDB";

const initialState = {
  isCreated: false,
  isCreating: false,
  message: "",
  errorCode: "",
};

const createAdminDB = {
  type: ADMIN_CREATE_DATABASE_SUCCESS,
  // database: "action.payload",
  isCreating: false,
  message: "Success! Your database has been created.",
};

const createAdminDBFailed = {
  type: ADMIN_CREATE_DATABASE_FAIL,
  isCreating: false,
  message: "Failed to create database. Please try again",
};

const startFetchingAction = {
  type: ADMIN_START_CREATING_DATABASE,
};

describe("add create db Reducer initial state", () => {
  it("should return the initial state", () => {
    expect(
      adminCreateDBReducer(
        {
          isCreated: false,
          isCreating: false,
          message: "",
          errorCode: "",
        },
        {}
      )
    ).toEqual(initialState);
  });
  it("should handle ADMIN create DATABASE_SUCCESS", () => {
    expect(adminCreateDBReducer(initialState, createAdminDB)).toEqual({
      ...initialState,
      isCreated: true,
      isCreating: false,
      message: "Success! Your database has been created.",
    });
  });

  it("should handle create admin db FAIL", () => {
    expect(
      adminCreateDBReducer(initialState, createAdminDBFailed)
    ).toEqual({
      ...initialState,
      isCreated: false,
      isCreating: false,
      message: "Failed to create database. Please try again",
      database: null,
      errorCode: undefined,
    });
  });

  it("should handle creating admin db STARTED", () => {
    expect(adminCreateDBReducer(initialState, startFetchingAction)).toEqual({
      ...initialState,
      isCreated: false,
      isCreating: true,
      message: "",
      errorCode: null,
      database:null
    });
  });

});
