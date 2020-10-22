import {
  FETCH_APP_MEMORY_SUCCESS,
  FETCH_APP_MEMORY_FAILED,
  IS_FETCHING_APP_MEMORY,
  CLEAR_APP_MEMORY
} from '../actions/actionTypes';

const initialState = {
  appMemoryMetrics: [],
  isFetchingAppMemory: false,
  appMemoryMessage: ''
};

const appMemoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APP_MEMORY_SUCCESS:
      return {
        ...state,
        appMemoryMetrics: [...state.appMemoryMetrics,
            {
              app: action.payload.app,
              metrics: action.payload.metrics
            }
          ],
          isFetchingAppMemory: false,
          appMemoryMessage: 'Fetched app memory metrics'
      };

    case FETCH_APP_MEMORY_FAILED:
      return {
        ...state,
        appMemoryMetrics: [...state.appMemoryMetrics,
            {
              app: action.payload.app,
              metrics: action.payload.metrics
            }
          ],
          isFetchingAppMemory: false,
          appMemoryMessage: 'Error fetching app memory metrics'
      };

    case IS_FETCHING_APP_MEMORY:
      return {
        ...state,
        isFetchingAppMemory: true,
      };

    case CLEAR_APP_MEMORY:
      return {
        ...state,
        appMemoryMetrics: [],
        isFetchingAppMemory: false,
        appMemoryMessage: ''
      };

    default:
      return state;
  }
};
export default appMemoryReducer;