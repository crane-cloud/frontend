import {
  FETCH_PVS_SUCCESS,
  FETCH_PVS_FAILED,
  IS_FETCHING
} from '../actions/actionTypes';

const initialState = {
  pvs: [],
  isRetrieving: false,
  message: 'Cluster Persistent Volumes Not Available'
};

const PvsReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_PVS_SUCCESS:
    return {
      ...state,
      pvs: action.payload,
      isRetrieving: false,
      message: 'All Cluster Persistent Volumes fetched'
    };

  case IS_FETCHING:
    return {
      ...state,
      isRetrieving: true
    };

  case FETCH_PVS_FAILED:
    return {
      ...state,
      message: action.payload,
      isRetrieving: false
    };

  default:
    return state;
  }
};
export default PvsReducer;
