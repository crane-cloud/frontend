import {
  START_GETTING_NODES,
  GET_NODES_FAIL,
  GET_NODES_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  nodes: [],
  isRetrieving: false,
  isFetched: false,
  message: 'Nodes Not Available'
};

const NodesReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_NODES_SUCCESS:
    return {
      ...state,
      nodes: action.payload,
      isRetrieving: false,
      isFetched: true,
      message: 'All Nodes fetched'
    };

  case START_GETTING_NODES:
    return {
      ...state,
      isRetrieving: true
    };

  case GET_NODES_FAIL:
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
