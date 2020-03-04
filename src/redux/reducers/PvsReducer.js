import {
  FETCH_PVS_SUCCESS,
  FETCH_PVS_FAILED,
  IS_FETCHING
} from '../actions/actionTypes';

const initialState = {
  volumes: [],
  isRetrieving: false,
  message: 'Cluster Volumes Not Available'
};

const PvsReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_PVS_SUCCESS:
    return {
      ...state,
      volumes: action.payload,
      isRetrieving: false,
      message: 'All Cluster Volumes fetched'
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
