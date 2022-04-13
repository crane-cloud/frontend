import {
  FETCH_APP_CPU_SUCCESS,
  FETCH_APP_CPU_FAILED,
  IS_FETCHING_APP_CPU,
  CLEAR_APP_CPU,
} from "../actions/actionTypes";
import appCpuReducer from "../reducers/appCpu";

const initialState = {
  appCPUMetrics: [],
  isFetchingCPU: false,
  cpuMessage: "",
};

const postProject = {
  type: FETCH_APP_CPU_SUCCESS,
  appCPUMetrics: [
    {
      app: "action.payload.app",
      metrics: "action.payload.metrics",
    },
  ],
  isFetchingCPU: false,
  cpuMessage: "Fetched app CPU metrics",
};

const postProjectFailedAction = {
  type: FETCH_APP_CPU_FAILED,
  isFetchingCPU: false,
  cpuMessage: "Error fetching app CPU metrics",
};

const startFetchingAction = {
  type: IS_FETCHING_APP_CPU,
};

describe("addProjectReducer initial state", () => {
  it("should return the initial state", () => {
    expect(
      appCpuReducer(
        {
          appCPUMetrics: [],
          isFetchingCPU: false,
          cpuMessage: "",
        },
        {}
      )
    ).toEqual(initialState);
  });

  it("should handle FETCH_APP_CPU_SUCCESS", () => {
    expect(appCpuReducer(initialState, postProject)).toEqual({
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

  it("should handle add project FAIL", () => {
    expect(appCpuReducer(initialState, postProjectFailedAction)).toEqual({
      ...initialState,
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

  it("should handle POSTING_STARTED", () => {
    expect(appCpuReducer(initialState, startFetchingAction)).toEqual({
      ...initialState,
      isFetchingCPU: true,
    });
  });
});
