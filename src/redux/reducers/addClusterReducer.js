import { ADD_CLUSTER_SUCCESS, ADD_CLUSTERS_FAIL, START_ADDING_CLUSTER } from '../actions/actionTypes';

const initialState = {
  isAdded: false,
  isFailed: false,
  isCreating: false,
  cluster: null,
  error: null,
  message: 'Add cluster'
};

const AddClusterReducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_CLUSTER_SUCCESS:
    return {
      ...state,
      cluster: action.payload,
      isCreating: false,
      isFailed: false,
      isAdded: true,
      message: 'Cluster Added SuccessFully'
    };

  case START_ADDING_CLUSTER:
    return {
      ...state,
      isCreating: true,
      isAdded: false
    };

  case ADD_CLUSTERS_FAIL:
    return {
      ...state,
      isFailed: true,
      isAdded: false,
      isCreating: false,
      error: action.payload.error,
      message: 'Failed to add cluster'
    };

  default:
    return state;
  }
};

export default AddClusterReducer;
