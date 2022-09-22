import {
  FETCH_PROJECT_NETWORK_SUCCESS,
  FETCH_PROJECT_NETWORK_FAILED,
  IS_FETCHING_PROJECT_NETWORK,
  CLEAR_PROJECT_NETWORK,
} from "../actions/actionTypes";

const initialState = {
  networkMetrics: [],
  isFetchingNetwork: false,
  networkMessage: "",
};

const projectNetworkReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT_NETWORK_SUCCESS:
      return {
        ...state,
        networkMetrics: [
          ...state.networkMetrics,
          { project: action.payload?.project, metrics: action.payload?.metrics },
        ],
        isFetchingNetwork: false,
        networkMessage: "Fetched project network metrics",
      };

    case FETCH_PROJECT_NETWORK_FAILED:
      return {
        ...state,
        networkMetrics: [
          ...state.networkMetrics,
          { project: action.payload?.project, metrics: action.payload?.metrics },
        ],
        isFetchingNetwork: false,
        networkMessage: "Error fetching project network metrics",
      };

    case IS_FETCHING_PROJECT_NETWORK:
      return {
        ...state,
        isFetchingNetwork: true,
      };

    case CLEAR_PROJECT_NETWORK:
      return {
        ...state,
        networkMetrics: [],
        isFetchingNetwork: false,
        networkMessage: "",
      };

    default:
      return state;
  }
};

export default projectNetworkReducer;
