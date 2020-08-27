import {
    FETCH_PROJECT_NETWORK_SUCCESS,
    FETCH_PROJECT_NETWORK_FAILED,
    IS_FETCHING_PROJECT_NETWORK,
    CLEAR_PROJECT_NETWORK
  } from '../actions/actionTypes';
  
  const initialState = {
    metrics: [],
    isFetching: false,
    message: ''
  };
  
  const projectNetworkReducer = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_PROJECT_NETWORK_SUCCESS:
      return {
        ...state,
        metrics: [...state.metrics,
          { project: action.payload.project, metrics: action.payload.metrics }
        ],
        isFetching: false,
        message: 'Fetched project network metrics'
      };
  
    case FETCH_PROJECT_NETWORK_FAILED:
      return {
        ...state,
        metrics: [...state.metrics,
          { project: action.payload.project, metrics: action.payload.metrics }
        ],
        isFetching: false,
        message: 'Error fetching project network metrics'
      };
  
    case IS_FETCHING_PROJECT_NETWORK:
      return {
        ...state,
        isFetching: true,
      };
  
    case CLEAR_PROJECT_NETWORK:
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
  export default projectNetworkReducer;
  