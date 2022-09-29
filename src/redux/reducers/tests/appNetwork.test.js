import appNetworkReducer from "../appNetwork";
import {
  FETCH_APP_NETWORK_SUCCESS,
  FETCH_APP_NETWORK_FAILED,
  IS_FETCHING_APP_NETWORK,
  CLEAR_APP_NETWORK,
} from "../../actions/actionTypes";

const initialState = {
  appNetworkMetrics: [],
  isFetchingAppNetwork: false,
  appNetworkMessage: "",
};

const fetchAction = {
  type: FETCH_APP_NETWORK_SUCCESS,
  appNetworkMetrics: [
    {
      app: [],
      metrics: [],
    },
  ],
  isFetchingAppNetwork: false,
  appNetworkMessage: "Fetched app Network metrics",
};

const fetchFailedAction = {
  type: FETCH_APP_NETWORK_FAILED,
  appNetworkMetrics: [
    {
      app: [],
      metrics: [],
    },
  ],
  isFetchingAppNetwork: false,
  appNetworkMessage: "Error fetching app Network metrics",
};

const startFetchingAction = {
  type: IS_FETCHING_APP_NETWORK,
};

const clearAction = {
  type: CLEAR_APP_NETWORK,
};

describe("appNetworkReducer initial state", () => {

  it("should handle cluster added", () => {
    expect(appNetworkReducer(initialState, fetchAction)).toEqual({
      appNetworkMetrics: [{
        app: undefined,
        metrics: undefined
      }],
      isFetchingAppNetwork: false,
      appNetworkMessage: "Fetched app Network metrics",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(appNetworkReducer(initialState, fetchFailedAction)).toEqual({
      appNetworkMetrics: [{
        app: undefined,
        metrics: undefined
      }],
      isFetchingAppNetwork: false,
      appNetworkMessage: "Error fetching app Network metrics",
    });
  });

  it("should handle adding cluster", () => {
    expect(appNetworkReducer(initialState, startFetchingAction)).toEqual({
      appNetworkMetrics: [],
      isFetchingAppNetwork: true,
      appNetworkMessage: "",
    });
  });

  it("should handle clear adding cluster", () => {
    expect(appNetworkReducer(initialState, clearAction)).toEqual({
      appNetworkMetrics: [],
      isFetchingAppNetwork: false,
      appNetworkMessage: "",
    });
  });
});
