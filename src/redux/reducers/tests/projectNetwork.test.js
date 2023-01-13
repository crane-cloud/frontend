import projectNetworkReducer from "../projectNetwork";
import {
  FETCH_PROJECT_NETWORK_SUCCESS,
  FETCH_PROJECT_NETWORK_FAILED,
  IS_FETCHING_PROJECT_NETWORK,
  CLEAR_PROJECT_NETWORK,
} from "../../actions/actionTypes";

const initialState = {
  networkMetrics: [],
  isFetchingNetwork: false,
  networkMessage: "",
};

const fetchAction = {
  type: FETCH_PROJECT_NETWORK_SUCCESS,
  networkMetrics: [
    {
      project: undefined,
      metrics: undefined,
    },
  ],
  isFetchingNetwork: false,
  networkMessage: "Fetched project Network metrics",
};

const fetchFailedAction = {
  type: FETCH_PROJECT_NETWORK_FAILED,
  networkMetrics: [
    {
      project: undefined,
      metrics: undefined,
    },
  ],
  isFetchingNetwork: false,
  networkMessage: "Error fetching project Network metrics",
};

const startFetchingAction = {
  type: IS_FETCHING_PROJECT_NETWORK,
};

const clearAction = {
  type: CLEAR_PROJECT_NETWORK,
};

describe("projectNetworkReducer initial state", () => {
  it("should return the initial state", () => {
    expect(projectNetworkReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(projectNetworkReducer(initialState, fetchAction)).toEqual({
      networkMetrics: [
        {
          project: undefined,
          metrics: undefined,
        },
      ],
      isFetchingNetwork: false,
      networkMessage: "Fetched project network metrics",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(projectNetworkReducer(initialState, fetchFailedAction)).toEqual({
      networkMetrics: [
        {
          project: undefined,
          metrics: undefined,
        },
      ],
      isFetchingNetwork: false,
      networkMessage: "Error fetching project network metrics",
    });
  });

  it("should handle adding database", () => {
    expect(projectNetworkReducer(initialState, startFetchingAction)).toEqual({
      networkMetrics: [],
      isFetchingNetwork: true,
      networkMessage: "",
    });
  });

  it("should handle clear adding database", () => {
    expect(projectNetworkReducer(initialState, clearAction)).toEqual({
      networkMetrics: [],
      isFetchingNetwork: false,
      networkMessage: "",
    });
  });
});
