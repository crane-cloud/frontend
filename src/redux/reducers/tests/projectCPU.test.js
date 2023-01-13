import projectCPUReducer from "../projectCPU";
import {
  FETCH_PROJECT_CPU_SUCCESS,
  FETCH_PROJECT_CPU_FAILED,
  IS_FETCHING_PROJECT_CPU,
  CLEAR_PROJECT_CPU,
} from "../../actions/actionTypes";

const initialState = {
  cpuMetrics: [],
  isFetchingCPU: false,
  cpuMessage: "",
};

const fetchAction = {
  type: FETCH_PROJECT_CPU_SUCCESS,
  cpuMetrics: [
    {
      project: undefined,
      metrics: undefined,
    },
  ],
  isFetchingCPU: false,
  cpuMessage: "Fetched project CPU metrics",
};

const fetchFailedAction = {
  type: FETCH_PROJECT_CPU_FAILED,
  cpuMetrics: [
    {
      project: undefined,
      metrics: undefined,
    },
  ],
  isFetchingCPU: false,
  cpuMessage: "Error fetching project CPU metrics",
};

const startFetchingAction = {
  type: IS_FETCHING_PROJECT_CPU,
};

const clearAction = {
  type: CLEAR_PROJECT_CPU,
};

describe("projectCPUReducer initial state", () => {
  it("should return the initial state", () => {
    expect(projectCPUReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(projectCPUReducer(initialState, fetchAction)).toEqual({
      cpuMetrics: [
        {
          project: undefined,
          metrics: undefined,
        },
      ],
      isFetchingCPU: false,
      cpuMessage: "Fetched project CPU metrics",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(projectCPUReducer(initialState, fetchFailedAction)).toEqual({
      cpuMetrics: [
        {
          project: undefined,
          metrics: undefined,
        },
      ],
      isFetchingCPU: false,
      cpuMessage: "Error fetching project CPU metrics",
    });
  });

  it("should handle adding database", () => {
    expect(projectCPUReducer(initialState, startFetchingAction)).toEqual({
      cpuMetrics: [],
      isFetchingCPU: true,
      cpuMessage: "",
    });
  });

  it("should handle clear adding database", () => {
    expect(projectCPUReducer(initialState, clearAction)).toEqual({
      cpuMetrics: [],
      isFetchingCPU: false,
      cpuMessage: "",
    });
  });
});
