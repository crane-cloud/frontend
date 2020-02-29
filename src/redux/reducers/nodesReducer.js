import {
  START_GETTING_RESOURCE,
  GET_RESOURCE_FAIL,
  GET_RESOURCE_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  nodes: [],
  isRetrieving: false,
  isFetched: false,
  message: 'Nodes Not Available'
};

const NodesReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_RESOURCE_SUCCESS:
    return {
      ...state,
      nodes: action.payload,
      isRetrieving: false,
      isFetched: true,
      message: 'All Nodes fetched'
    };

  case START_GETTING_RESOURCE:
    return {
      ...state,
      isFetched: false,
      isRetrieving: true
    };

  case GET_RESOURCE_FAIL:
    return {
      ...state,
      message: action.payload,
      isFetched: false,
      isRetrieving: false
    };

  default:
    return state;
  }
};
export default NodesReducer;
