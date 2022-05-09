import {
  FETCH_APP_NETWORK_SUCCESS,
  FETCH_APP_NETWORK_FAILED,
  IS_FETCHING_APP_NETWORK,
  CLEAR_APP_NETWORK,
} from "../actions/actionTypes";

const initialState = {
  appNetworkMetrics: [],
  isFetchingAppNetwork: false,
  appNetworkMessage: "",
};

const appNetworkReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APP_NETWORK_SUCCESS:
      return {
        ...state,
        appNetworkMetrics: [
          ...state.appNetworkMetrics,
          {
            app: action.payload.app,
            metrics: action.payload.metrics,
          },
        ],
        isFetchingAppNetwork: false,
        appNetworkMessage: "Fetched app Network metrics",
      };

    case FETCH_APP_NETWORK_FAILED:
      return {
        ...state,
        appNetworkMetrics: [
          ...state.appNetworkMetrics,
          {
            app: action.payload.app,
            metrics: action.payload.metrics,
          },
        ],
        isFetchingAppNetwork: false,
        appNetworkMessage: "Error fetching app Network metrics",
      };

    case IS_FETCHING_APP_NETWORK:
      return {
        ...state,
        isFetchingAppNetwork: true,
      };

    case CLEAR_APP_NETWORK:
      return {
        ...state,
        appNetworkMetrics: [],
        isFetchingAppNetwork: false,
        appNetworkMessage: "",
      };

    default:
      return state;
  }
};
export default appNetworkReducer;
