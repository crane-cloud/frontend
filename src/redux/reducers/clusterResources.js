import {
  GET_RESOURCES_COUNT,
  GET_RESOURCES_COUNT_FAILED,
  START_GETTING_RESOURCES_COUNT
} from '../actions/actionTypes';

const initialState = {
  resourceCount: [],
  isRetrieving: false,
  isRetrieved: false,
  message: 'Cluster Resources Not Available'
};

const clusterResourcesReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_RESOURCES_COUNT:
    return {
      ...state,
      resourceCount: action.payload,
      isRetrieved: true,
      isRetrieving: false,
      clusterName: action.clusterName,
      message: 'All Cluster Resources fetched'
    };
  case START_GETTING_RESOURCES_COUNT:
    return {
      ...state,
      isRetrieved: false,
      isRetrieving: true
    };
  case GET_RESOURCES_COUNT_FAILED:
    return {
      ...state,
      message: action.payload,
      isRetrieved: false,
      isRetrieving: false
    };
  default:
    return state;
  }
};

export default clusterResourcesReducer;
