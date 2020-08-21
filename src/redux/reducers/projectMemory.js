import {
  FETCH_PROJECT_MEMORY_SUCCESS,
  FETCH_PROJECT_MEMORY_FAILED,
  IS_FETCHING_PROJECT_MEMORY,
} from '../actions/actionTypes';

const initialState = {
  metrics: [],
  isFetching: false,
  message: ''
};

const projectMemoryReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_PROJECT_MEMORY_SUCCESS:
    return {
      ...state,
      metrics: action.payload,
      isFetching: false,
      message: 'Fetched project memory metrics'
    };

  case FETCH_PROJECT_MEMORY_FAILED:
    return {
      ...state,
      data: action.payload,
      isFetching: false,
      message: 'Error fetching project memory metrics'
    };

  case IS_FETCHING_PROJECT_MEMORY:
    return {
      ...state,
      isFetching: true,
      message: ''
    };

  default:
    return state;
  }
};
export default projectMemoryReducer;
