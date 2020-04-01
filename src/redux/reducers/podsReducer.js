import {
  START_GETTING_PODS,
  GET_PODS_FAIL,
  GET_PODS_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  pods: [],
  isRetrieving: false,
  isFetched: false,
  message: 'Pods Not Available'
};

const PodsReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_PODS_SUCCESS:
    return {
      ...state,
      pods: action.payload,
      isRetrieving: false,
      isFetched: true,
      message: 'All Pods fetched'
    };

  case START_GETTING_PODS:
    return {
      ...state,
      isFetched: false,
      isRetrieving: true
    };

  case GET_PODS_FAIL:
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
export default PodsReducer;
