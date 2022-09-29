import projectMemoryReducer from "../projectMemory";
import {
  FETCH_PROJECT_MEMORY_SUCCESS,
  FETCH_PROJECT_MEMORY_FAILED,
  IS_FETCHING_PROJECT_MEMORY,
  CLEAR_PROJECT_MEMORY,
} from "../../actions/actionTypes";

const initialState = {
  memoryMetrics: [],
  isFetchingMemory: false,
  memoryMessage: "",
};

const fetchAction = {
  type: FETCH_PROJECT_MEMORY_SUCCESS,
  memoryMetrics: [
    {
      project: undefined,
      metrics: undefined,
    },
  ],
  isFetchingMemory: false,
  memoryMessage: "Fetched project Memory metrics",
};

const fetchFailedAction = {
  type: FETCH_PROJECT_MEMORY_FAILED,
  memoryMetrics: [
    {
      project: undefined,
      metrics: undefined,
    },
  ],
  isFetchingMemory: false,
  memoryMessage: "Error fetching project Memory metrics",
};

const startFetchingAction = {
  type: IS_FETCHING_PROJECT_MEMORY,
};

const clearAction = {
  type: CLEAR_PROJECT_MEMORY,
};

describe("projectMemoryReducer initial state", () => {
  it("should return the initial state", () => {
    expect(projectMemoryReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(projectMemoryReducer(initialState, fetchAction)).toEqual({
      memoryMetrics: [
        {
          project: undefined,
          metrics: undefined,
        },
      ],
      isFetchingMemory: false,
      memoryMessage: "Fetched project memory metrics",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(projectMemoryReducer(initialState, fetchFailedAction)).toEqual({
      memoryMetrics: [
        {
          project: undefined,
          metrics: undefined,
        },
      ],
      isFetchingMemory: false,
      memoryMessage: "Error fetching project memory metrics",
    });
  });

  it("should handle adding database", () => {
    expect(projectMemoryReducer(initialState, startFetchingAction)).toEqual({
      memoryMetrics: [],
      isFetchingMemory: true,
      memoryMessage: "",
    });
  });

  it("should handle clear adding database", () => {
    expect(projectMemoryReducer(initialState, clearAction)).toEqual({
      memoryMetrics: [],
      isFetchingMemory: false,
      memoryMessage: "",
    });
  });
});
