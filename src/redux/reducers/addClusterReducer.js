import { ADD_CLUSTER_SUCCESS, ADD_CLUSTERS_FAIL, START_ADDING_CLUSTER } from '../actions/actionTypes';

const initialState = {
  isSending: false,
  message: 'Add cluster'
};

const AddClusterReducer = ( state = initialState, action) => {
  switch (action.type) {
  case ADD_CLUSTER_SUCCESS: {
    return {
      ...state,
      cluster: action.payload,
      isSending: false,
      isAdded: true,
      message: 'Cluster Added SuccessFully'
    };
  }
  case START_ADDING_CLUSTER:
    return {
      ...state,
      isAdded: false,
      isSending: true
    };
  case ADD_CLUSTERS_FAIL:
    return {
      ...state,
      isSending: false,
      isAdded: false,
      errorOccured: action.payload.error,
      message: 'Failed to add cluster'
    };

  default:
    return state;
  }
};

export default AddClusterReducer;
