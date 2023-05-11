import {
  FETCH_PVS_SUCCESS,
  FETCH_PVS_FAILED,
  IS_FETCHING,
} from "../actions/actionTypes";

const initialState = {
  pvs: [],
  isRetrieving: false,
  pagination: {},
  isFetched: false,
  message: "Cluster Volumes Not Available",
};

const pvsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PVS_SUCCESS:
      return {
        ...state,
        pvs: action.payload.pvs,
        pagination: action.payload.pagination,
        isFetched: true,
        isRetrieving: false,
        message: "All Cluster Volumes fetched",
      };

    case IS_FETCHING:
      return {
        ...state,
        isRetrieving: true,
      };

    case FETCH_PVS_FAILED:
      return {
        ...state,
        message: action.payload,
        isFetched: false,
        isRetrieving: false,
        pagination: {}
      };

    default:
      return state;
  }
};
export default pvsReducer;
