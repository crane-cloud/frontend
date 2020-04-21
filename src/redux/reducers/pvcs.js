
import {
  FETCH_PVCS_SUCCESS,
  FETCH_PVCS_FAILED,
  IS_FETCHING
} from '../actions/actionTypes';

const initialState = {
  pvcs: [],
  isRetrieving: false,
  isFetched: false,
  message: 'Cluster pvcs Not Available'
};

const pvcsReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_PVCS_SUCCESS:
    return {
      ...state,
      pvcs: action.payload,
      isRetrieving: false,
      isFetched: true,
      message: 'All Cluster Pvcs fetched'
    };

  case IS_FETCHING:
    return {
      ...state,
      isRetrieving: true,
    };

  case FETCH_PVCS_FAILED:
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
export default pvcsReducer;
