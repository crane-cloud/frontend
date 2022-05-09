import {
  GET_APPS_SUCCESS,
  GET_APPS_FAIL,
  START_GETTING_APPS,
} from "../actions/actionTypes";
import appsListReducer from "../reducers/appsList";

const initialState = {
  apps: { apps: [] },
  isRetrieved: false,
  isRetrieving: false,
  message: "Apps Not Available",
};

const appListSuccess = {
  type: GET_APPS_SUCCESS,
  isRetrieving: false,
};

const appListFail = {
  type: GET_APPS_FAIL,
  error: "action.payload",
  isRetrieving: false,
  isRetrieved: false,
};

const startFetchingAction = {
  type: START_GETTING_APPS,
};

describe("add get applist Reducer initial state", () => {
  it("should return the initial state", () => {
    expect(
      appsListReducer(
        {
          apps: { apps: [] },
          isRetrieved: false,
          isRetrieving: false,
          message: "Apps Not Available",
        },
        {}
      )
    ).toEqual(initialState);
  });
  it("should handle ADMIN get DATABASE_SUCCESS", () => {
    expect(appsListReducer(initialState, appListSuccess)).toEqual({
      ...initialState,
      isRetrieved: true,
      message: "All Apps fetched",
      apps: undefined,
    });
  });

  it("should handle get  applist FAIL", () => {
    expect(appsListReducer(initialState, appListFail)).toEqual({
      ...initialState,
    });
  });

  it("should handle getting  applist STARTED", () => {
    expect(appsListReducer(initialState, startFetchingAction)).toEqual({
      ...initialState,
      isRetrieved: false,
      isRetrieving: true,
    });
  });
});
