import {
  FETCH_APP_MEMORY_SUCCESS,
  FETCH_APP_MEMORY_FAILED,
  IS_FETCHING_APP_MEMORY,
  CLEAR_APP_MEMORY,
} from "../actions/actionTypes";
import appMemoryReducer from "../reducers/appMemoryReducer";

const initialState = {
  appMemoryMetrics: [],
  isFetchingAppMemory: false,
  appMemoryMessage: "",
};

const postProject = {
  type: FETCH_APP_MEMORY_SUCCESS,
  appMemoryMetrics: [
    {
      app: "action.payload.app",
      metrics: "action.payload.metrics",
    },
  ],
  isFetchingAppMemory: false,
  appMemoryMessage: "Fetched app memory metrics",
};

const postProjectFailedAction = {
  type: FETCH_APP_MEMORY_FAILED,
  isFetchingAppMemory: false,
  appMemoryMessage: "Error fetching app memory metrics",
};

const startFetchingAction = {
  type: IS_FETCHING_APP_MEMORY,
};

describe("add memory Reducer initial state", () => {
  it("should return the initial state", () => {
    expect(
      appMemoryReducer(
        {
          appMemoryMetrics: [],
          isFetchingAppMemory: false,
          appMemoryMessage: "",
        },
        {}
      )
    ).toEqual(initialState);
  });

  it("should handle FETCH_APP_MEMORY_SUCCESS", () => {
    expect(appMemoryReducer(initialState, postProject)).toEqual({
      appMemoryMetrics: [
        {
          app: undefined,
          metrics: undefined,
        },
      ],
      isFetchingAppMemory: false,
      appMemoryMessage: "Fetched app memory metrics",
    });
  });

  it("should handle add project FAIL", () => {
    expect(appMemoryReducer(initialState, postProjectFailedAction)).toEqual({
      ...initialState,
      appMemoryMetrics: [
        {
          app: undefined,
          metrics: undefined,
        },
      ],
      isFetchingAppMemory: false,
      appMemoryMessage: "Error fetching app memory metrics",
    });
  });

  it("should handle fetching metrics STARTED", () => {
    expect(appMemoryReducer(initialState, startFetchingAction)).toEqual({
      ...initialState,
      isFetchingAppMemory: true,
    });
  });
});
