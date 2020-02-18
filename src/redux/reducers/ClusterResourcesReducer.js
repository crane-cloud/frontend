import {
  GET_RESOURCES_COUNT,
  GET_RESOURCES_COUNT_FAILED,
  START_GETTING_RESOURCES_COUNT
} from '../actions/actionTypes';

const initialState = {
  items: [],
  isRetrieving: false,
  message: 'Cluster Resources Not Available'
};

const ClusterResourcesReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_RESOURCES_COUNT:
    return {
      ...state,
      items: action.payload,
      isRetrieving: false,
      message: 'All Cluster Resources fetched'
    };
  case START_GETTING_RESOURCES_COUNT:
    return {
      ...state,
      isRetrieving: true
    };
  case GET_RESOURCES_COUNT_FAILED:
    return {
      ...state,
      message: action.payload,
      isRetrieving: false
    };
  default:
    return state;
  }
};

export default ClusterResourcesReducer;
