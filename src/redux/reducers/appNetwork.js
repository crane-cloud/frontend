import {
  FETCH_APP_NETWORK_SUCCESS,
  FETCH_APP_NETWORK_FAILED,
  IS_FETCHING_APP_NETWORK,
  CLEAR_APP_NETWORK
} from '../actions/actionTypes';

const initialState = {
  metrics: [],
  isFetching: false,
  message: ''
};

const appNetworkReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APP_NETWORK_SUCCESS:
      return {
        ...state,
        metrics: [...state.metrics,
            {
              app: action.payload.app,
              metrics: action.payload.metrics
            }
          ],
          isFetching: false,
          message: 'Fetched app Network metrics'
      };

    case FETCH_APP_NETWORK_FAILED:
      return {
        ...state,
        metrics: [...state.metrics,
            {
              app: action.payload.app,
              metrics: action.payload.metrics
            }
          ],
          isFetching: false,
          message: 'Error fetching app Network metrics'
      };

    case IS_FETCHING_APP_NETWORK:
      return {
        ...state,
        isFetching: true,
      };

    case CLEAR_APP_NETWORK:
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
export default appNetworkReducer;