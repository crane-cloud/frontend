import {
  FETCH_APP_NETWORK_SUCCESS,
  FETCH_APP_NETWORK_FAILED,
  IS_FETCHING_APP_NETWORK,
} from "../actions/actionTypes";
import appNetworkReducer from "../reducers/appNetwork";

const initialState = {
  appNetworkMetrics: [],
  isFetchingAppNetwork: false,
  appNetworkMessage: "",
};

const getAppNetworkPass = {
  type: FETCH_APP_NETWORK_SUCCESS,
  appNetworkMetrics: [
    {
      app: "action.payload.app",
      metrics: "action.payload.metrics",
    },
  ],
  isFetchingAppNetwork: false,
  appNetworkMessage: "Fetched app Network metrics",
};

const getAppNetworkFailedAction = {
  type: FETCH_APP_NETWORK_FAILED,
  isFetchingAppNetwork: false,
  appNetworkMessage: "Error fetching app Network metrics",
};

const startFetchingAction = {
  type: IS_FETCHING_APP_NETWORK,
};

describe("add Network Reducer initial state", () => {
  it("should return the initial state", () => {
    expect(
      appNetworkReducer(
        {
          appNetworkMetrics: [],
          isFetchingAppNetwork: false,
          appNetworkMessage: "",
        },
        {}
      )
    ).toEqual(initialState);
  });

  it("should handle FETCH_APP_NETWORK_SUCCESS", () => {
    expect(appNetworkReducer(initialState, getAppNetworkPass)).toEqual({
      appNetworkMetrics: [
        {
          app: undefined,
          metrics: undefined,
        },
      ],
      isFetchingAppNetwork: false,
      appNetworkMessage: "Fetched app Network metrics",
    });
  });

  it("should handle add project FAIL", () => {
    expect(appNetworkReducer(initialState, getAppNetworkFailedAction)).toEqual({
      ...initialState,
      appNetworkMetrics: [
        {
          app: undefined,
          metrics: undefined,
        },
      ],
      isFetchingAppNetwork: false,
      appNetworkMessage: "Error fetching app Network metrics",
    });
  });

  it("should handle fetching metrics STARTED", () => {
    expect(appNetworkReducer(initialState, startFetchingAction)).toEqual({
      ...initialState,
      isFetchingAppNetwork: true,
    });
  });
});
