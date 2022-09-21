import {
    START_UPDATING_CLUSTER,
    CLEAR_CLUSTER_UPDATE_STATE,
    UPDATE_CLUSTER_SUCCESS,
    UPDATE_CLUSTER_FAILED,
  } from "../actions/actionTypes";
  
  const initialState = {
    isUpdated: false,
    isUpdating: false,
    errorMessage: "",
    errorCode: null,
  };
  
  const updateClusterReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_CLUSTER_SUCCESS: {
        return {
          ...state,
          project: action.payload,
          isFailed: false,
          isUpdated: true,
          isUpdating: false,
          errorMessage: "",
          errorCode: null,
        };
      }
      case START_UPDATING_CLUSTER:
        return {
          ...state,
          isUpdated: false,
          isUpdating: true,
          errorCode: null,
          isFailed: false,
        };
      case UPDATE_CLUSTER_FAILED:
        return {
          ...state,
          isFailed: true,
          isUpdated: false,
          isUpdating: false,
          errorCode: action.payload?.errorCode,
          errorMessage: "Failed to update Cluster",
        };
  
      case CLEAR_CLUSTER_UPDATE_STATE:
        return {
          ...state,
          isFailed: false,
          isUpdated: false,
          isUpdating: false,
          errorCode: null,
          errorMessage: "",
        };
  
      default:
        return state;
    }
  };
  
  export default updateClusterReducer;
  