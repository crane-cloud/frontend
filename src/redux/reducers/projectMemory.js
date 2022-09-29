import {
  FETCH_PROJECT_MEMORY_SUCCESS,
  FETCH_PROJECT_MEMORY_FAILED,
  IS_FETCHING_PROJECT_MEMORY,
  CLEAR_PROJECT_MEMORY,
} from "../actions/actionTypes";

const initialState = {
  memoryMetrics: [],
  isFetchingMemory: false,
  memoryMessage: "",
};

const projectMemoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT_MEMORY_SUCCESS:
      return {
        ...state,
        memoryMetrics: [
          ...state.memoryMetrics,
          { project: action.payload?.project, metrics: action.payload?.metrics },
        ],
        isFetchingMemory: false,
        memoryMessage: "Fetched project memory metrics",
      };

    case FETCH_PROJECT_MEMORY_FAILED:
      return {
        ...state,
        memoryMetrics: [
          ...state.memoryMetrics,
          { project: action.payload?.project, metrics: action.payload?.metrics },
        ],
        isFetchingMemory: false,
        memoryMessage: "Error fetching project memory metrics",
      };

    case IS_FETCHING_PROJECT_MEMORY:
      return {
        ...state,
        isFetchingMemory: true,
      };

    case CLEAR_PROJECT_MEMORY:
      return {
        ...state,
        memoryMetrics: [],
        isFetchingMemory: false,
        memoryMessage: "",
      };

    default:
      return state;
  }
};
export default projectMemoryReducer;
