import {
  FETCH_PROJECT_MEMORY_SUCCESS,
  FETCH_PROJECT_MEMORY_FAILED,
  IS_FETCHING_PROJECT_MEMORY,
  CLEAR_PROJECT_MEMORY_METRICS
} from '../actions/actionTypes';

const initialState = {
  metrics: [],
  isFetching: false,
  message: ''
};

const projectMemoryReducer = (state = initialState, action) => {
  switch (action.type) {
  case CLEAR_PROJECT_MEMORY_METRICS:
    return {
      metrics: [],
      isFetching: false,
      message: ''
    };

  case FETCH_PROJECT_MEMORY_SUCCESS:
    return {
      metrics: action.payload,
      isFetching: false,
      message: 'Fetched project memory metrics'
    };

  case FETCH_PROJECT_MEMORY_FAILED:
    return {
      metrics: [],
      isFetching: false,
      message: 'Error fetching project memory metrics'
    };

  case IS_FETCHING_PROJECT_MEMORY:
    return {
      metrics: [],
      isFetching: true,
      message: ''
    };

  default:
    return state;
  }
};
export default projectMemoryReducer;
