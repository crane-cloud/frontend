import {
  FETCH_NODES_TABLE,
  FETCH_TOTAL_NODES,
  FETCH_NODES_OUTOFDISK,
  FETCH_NODES_UNAVAILABLE
} from '../../actions/actionTypes';

const initialState = {
  nodesArray: [],
  nodesTotal: 0,
  nodesOutOfDisk: 0,
  nodesUnavailable: 0
};

const fetchNodes = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_NODES_TABLE:
    return {
      ...state,
      nodesArray: action.payload
    };

  case FETCH_TOTAL_NODES:
    return {
      ...state,
      nodesTotal: action.payload
    };

  case FETCH_NODES_OUTOFDISK:
    return {
      ...state,
      nodesOutOfDisk: action.payload
    };

  case FETCH_NODES_UNAVAILABLE:
    return {
      ...state,
      nodesUnavailable: action.payload
    };

  default:
    return state;
  }
};

export default fetchNodes;
