import {
  FETCH_PROJECT_MEMORY_SUCCESS,
  FETCH_PROJECT_MEMORY_FAILED,
  IS_FETCHING_PROJECT_MEMORY,
  CLEAR_PROJECT_MEMORY
} from '../actions/actionTypes';

const initialState = {
  memoryMetrics: [],
  isFetching: false,
  message: ''
};

const projectMemoryReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_PROJECT_MEMORY_SUCCESS:
    return {
      ...state,
      memoryMetrics: [...state.memoryMetrics,
        { project: action.payload.project, memoryMetrics: action.payload.metrics }
      ],
      isFetching: false,
      message: 'Fetched project memory metrics'
    };

  case FETCH_PROJECT_MEMORY_FAILED:
    return {
      ...state,
      memoryMetrics: [...state.memoryMetrics,
        { project: action.payload.project, memoryMetrics: action.payload.metrics }
      ],
      isFetching: false,
      message: 'Error fetching project memory metrics'
    };

  case IS_FETCHING_PROJECT_MEMORY:
    return {
      ...state,
      isFetching: true,
    };

  case CLEAR_PROJECT_MEMORY:
    return {
      ...state,
      memoryMetrics: [],
      isFetching: false,
      message: ''
    };

  default:
    return state;
  }
};
export default projectMemoryReducer;
