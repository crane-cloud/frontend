import {
  IS_FETCHING,
  FETCH_NAMESPACES_SUCCESS,
  FETCH_NAMESPACES_FAILED
} from '../actions/actionTypes';

const initialState = {
  namespacesList: [],
  isRetrieving: false,
  message: 'No Namespaces Available'
};

const NamespacesListReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_NAMESPACES_SUCCESS:
    return {
      ...state,
      namespacesList: action.payload,
      isRetrieving: false,
      message: 'All Namespaces in this Cluster fetched'
    };

  case IS_FETCHING:
    return {
      ...state,
      isRetrieving: true
    };

  case FETCH_NAMESPACES_FAILED:
    return {
      ...state,
      message: action.payload,
      isRetrieving: false
    };
  default:
    return state;
  }
};

export default NamespacesListReducer;
