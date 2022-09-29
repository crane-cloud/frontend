import {
  FETCH_PROJECT_CPU_SUCCESS,
  FETCH_PROJECT_CPU_FAILED,
  IS_FETCHING_PROJECT_CPU,
  CLEAR_PROJECT_CPU,
} from "../actions/actionTypes";

const initialState = {
  cpuMetrics: [],
  isFetchingCPU: false,
  cpuMessage: "",
};

const projectCPUReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT_CPU_SUCCESS:
      return {
        ...state,
        cpuMetrics: [
          ...state.cpuMetrics,
          {
            project: action.payload?.project,
            metrics: action.payload?.metrics,
          },
        ],
        isFetchingCPU: false,
        cpuMessage: "Fetched project CPU metrics",
      };

    case FETCH_PROJECT_CPU_FAILED:
      return {
        ...state,
        cpuMetrics: [
          ...state.cpuMetrics,
          {
            project: action.payload?.project,
            metrics: action.payload?.metrics,
          },
        ],
        isFetchingCPU: false,
        cpuMessage: "Error fetching project CPU metrics",
      };

    case IS_FETCHING_PROJECT_CPU:
      return {
        ...state,
        isFetchingCPU: true,
      };

    case CLEAR_PROJECT_CPU:
      return {
        ...state,
        cpuMetrics: [],
        isFetchingCPU: false,
        cpuMessage: "",
      };

    default:
      return state;
  }
};
export default projectCPUReducer;
