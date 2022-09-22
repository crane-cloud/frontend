import appCpuReducer from "../appCpu";
import {
  FETCH_APP_CPU_SUCCESS,
  FETCH_APP_CPU_FAILED,
  IS_FETCHING_APP_CPU,
  CLEAR_APP_CPU,
} from "../../actions/actionTypes";

const initialState = {
  appCPUMetrics: [],
  isFetchingCPU: false,
  cpuMessage: "",
};

const fetchAction = {
  type: FETCH_APP_CPU_SUCCESS,
  appCPUMetrics: [
    {
      app: [],
      metrics: [],
    },
  ],
  isFetchingCPU: false,
  cpuMessage: "Fetched app CPU metrics",
};

const fetchFailedAction = {
  type: FETCH_APP_CPU_FAILED,
  appCPUMetrics: [
    {
      app: [],
      metrics: [],
    },
  ],
  isFetchingCPU: false,
  cpuMessage: "Error fetching app CPU metrics",
};

const startFetchingAction = {
  type: IS_FETCHING_APP_CPU,
};

const clearAction = {
  type: CLEAR_APP_CPU,
};

describe("appCpuReducer initial state", () => {
  it("should return the initial state", () => {
    expect(appCpuReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle cluster added", () => {
    expect(appCpuReducer(initialState, fetchAction)).toEqual({
      appCPUMetrics: [
        {
          app: undefined,
          metrics: undefined,
        },
      ],
      isFetchingCPU: false,
      cpuMessage: "Fetched app CPU metrics",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(appCpuReducer(initialState, fetchFailedAction)).toEqual({
      appCPUMetrics: [
        {
          app: undefined,
          metrics: undefined,
        },
      ],
      isFetchingCPU: false,
      cpuMessage: "Error fetching app CPU metrics",
    });
  });

  it("should handle adding cluster", () => {
    expect(appCpuReducer(initialState, startFetchingAction)).toEqual({
      appCPUMetrics: [],
      isFetchingCPU: true,
      cpuMessage: "",
    });
  });

  it("should handle clear adding cluster", () => {
    expect(appCpuReducer(initialState, clearAction)).toEqual({
      appCPUMetrics: [],
      isFetchingCPU: false,
      cpuMessage: "",
    });
  });
});
