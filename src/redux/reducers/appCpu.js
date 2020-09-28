import {
  FETCH_APP_CPU_SUCCESS,
  FETCH_APP_CPU_FAILED,
  IS_FETCHING_APP_CPU,
  CLEAR_APP_CPU
} from '../actions/actionTypes';

const initialState = {
  cpuMetrics: [],
  isFetchingCPU: false,
  cpuMessage: ''
};

const appCpuReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APP_CPU_SUCCESS:
      return {
        ...state,
        cpuMetrics: [...state.cpuMetrics,
            {
              app: action.payload.app,
              metrics: action.payload.metrics
            }
          ],
          isFetchingCPU: false,
          cpuMessage: 'Fetched app CPU metrics'
      };

    case FETCH_APP_CPU_FAILED:
      return {
        ...state,
        cpuMetrics: [...state.cpuMetrics,
            {
              app: action.payload.app,
              metrics: action.payload.metrics
            }
          ],
          isFetchingCPU: false,
          cpuMessage: 'Error fetching app CPU metrics'
      };

    case IS_FETCHING_APP_CPU:
      return {
        ...state,
        isFetchingCPU: true,
      };

    case CLEAR_APP_CPU:
      return {
        ...state,
        cpuMetrics: [],
          isFetchingCPU: false,
          cpuMessage: ''
      };

    default:
      return state;
  }
};
export default appCpuReducer;