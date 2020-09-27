
import {
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILED,
  IS_FETCHING
} from '../actions/actionTypes';

const initialState = {
  pvcs: [],
  isRetrieving: false,
  isFetched: false,
  message: 'Cluster Jobs Not Available'
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_JOBS_SUCCESS:
    return {
      ...state,
      jobs: action.payload,
      isRetrieving: false,
      isFetched: true,
      message: 'All Cluster Jobs fetched'
    };

  case IS_FETCHING:
    return {
      ...state,
      isRetrieving: true,
    };

  case FETCH_JOBS_FAILED:
    return {
      ...state,
      message: action.payload,
      isFetched: false,
      isRetrieving: false,
    };

  default:
    return state;
  }
};
export default jobsReducer;
