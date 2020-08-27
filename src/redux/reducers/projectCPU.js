import {
  FETCH_PROJECT_CPU_SUCCESS,
  FETCH_PROJECT_CPU_FAILED,
  IS_FETCHING_PROJECT_CPU,
  CLEAR_PROJECT_CPU
} from '../actions/actionTypes';

const initialState = {
  metrics: [],
  isFetching: false,
  message: ''
};

const projectCPUReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_PROJECT_CPU_SUCCESS:
    return {
      ...state,
      metrics: [...state.metrics,
        { project: action.payload.project, metrics: action.payload.metrics }
      ],
      isFetching: false,
      message: 'Fetched project CPU metrics'
    };

  case FETCH_PROJECT_CPU_FAILED:
    return {
      ...state,
      metrics: [...state.metrics,
        { project: action.payload.project, metrics: action.payload.metrics }
      ],
      isFetching: false,
      message: 'Error fetching project CPU metrics'
    };

  case IS_FETCHING_PROJECT_CPU:
    return {
      ...state,
      isFetching: true,
    };

  case CLEAR_PROJECT_CPU:
    return {
      ...state,
      metrics: [],
      isFetching: false,
      message: ''
    };

  default:
    return state;
  }
};
export default projectCPUReducer;
