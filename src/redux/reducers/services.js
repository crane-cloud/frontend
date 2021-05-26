import {
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_FAILED,
  IS_FETCHING,
} from "../actions/actionTypes";

const initialState = {
  services: [],
  isFetched: false,
  isRetrieving: false,
  message: "Cluster Services Not Available",
};

const servicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SERVICES_SUCCESS:
      return {
        ...state,
        services: action.payload,
        isFetched: true,
        isRetrieving: false,
        message: "All Cluster Services fetched",
      };

    case IS_FETCHING:
      return {
        ...state,
        isRetrieving: true,
      };

    case FETCH_SERVICES_FAILED:
      return {
        ...state,
        isFetched: false,
        message: action.payload,
        isRetrieving: false,
      };

    default:
      return state;
  }
};
export default servicesReducer;
