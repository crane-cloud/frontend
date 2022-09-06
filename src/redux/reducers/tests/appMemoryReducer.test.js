import appMemoryReducer from "../adminGetUserCredits";
import {
  FETCH_APP_MEMORY_SUCCESS,
  FETCH_APP_MEMORY_FAILED,
  IS_FETCHING_APP_MEMORY,
  CLEAR_APP_MEMORY,
} from "../../actions/actionTypes";

const initialState = {
  appMemoryMetrics: [],
  isFetchingAppMemory: false,
  appMemoryMessage: "",
};

const fetchAction = {
  type: FETCH_APP_MEMORY_SUCCESS,
  appMemoryMetrics: [
    {
      app: [],
      metrics: [],
    },
  ],
  isFetchingAppMemory: false,
  appMemoryMessage: "Fetched app memory metrics",
};

const fetchFailedAction = {
  type: FETCH_APP_MEMORY_FAILED,
  appMemoryMetrics: [
    {
      app: [],
      metrics: [],
    },
  ],
  isFetchingAppMemory: false,
  appMemoryMessage: "Error fetching app memory metrics",
};

const startFetchingAction = {
  type: IS_FETCHING_APP_MEMORY,
};

const clearAction = {
  type: CLEAR_APP_MEMORY,
};

describe("appMemoryReducer initial state", () => {

  it("should handle cluster added", () => {
    expect(appMemoryReducer(initialState, fetchAction)).toEqual({
      appMemoryMetrics: [],
      isFetchingAppMemory: false,
      appMemoryMessage: "",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(appMemoryReducer(initialState, fetchFailedAction)).toEqual({
      appMemoryMetrics: [],
      isFetchingAppMemory: false,
      appMemoryMessage: "",
    });
  });

  it("should handle adding cluster", () => {
    expect(appMemoryReducer(initialState, startFetchingAction)).toEqual({
      appMemoryMetrics: [],
      isFetchingAppMemory: false,
      appMemoryMessage: "",
    });
  });

  it("should handle clear adding cluster", () => {
    expect(appMemoryReducer(initialState, clearAction)).toEqual({
      appMemoryMetrics: [],
      isFetchingAppMemory: false,
      appMemoryMessage: "",
    });
  });
});
