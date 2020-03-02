
import {
  FETCH_PVCS_SUCCESS,
  FETCH_PVCS_FAILED,
  START_GETTING_CLUSTERS
} from '../actions/actionTypes';

const initialState = {
  clusters: [],
  isRetrieving: false,
  message: 'Clusters Not Available'
};

const PvcsReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_PVCS_SUCCESS:
    return {
      ...state,
      clusters: action.payload,
      isRetrieving: false,
      message: 'All Cluster Pvcs fetched'
    };

  case START_GETTING_CLUSTERS:
    return {
      ...state,
      isRetrieving: true
    };

  case FETCH_PVCS_FAILED:
    return {
      ...state,
      message: action.payload,
      isRetrieving: false
    };

  default:
    return state;
  }
};
export default PvcsReducer;
