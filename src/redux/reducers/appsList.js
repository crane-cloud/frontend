import {
  GET_APPS_SUCCESS,
  GET_APPS_FAIL,
  START_GETTING_APPS,
} from "../actions/actionTypes";

const initialState = {
  apps: {apps:[]},
  isRetrieved: false,
  isRetrieving: false,
  message: "Apps Not Available",
};

const appsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APPS_SUCCESS:
      return {
        ...state,
        apps: action.payload,
        isRetrieving: false,
        isRetrieved: true,
        message: "All Apps fetched",
      };

    case START_GETTING_APPS:
      return {
        ...state,
        isRetrieved: false,
        isRetrieving: true,
      };

    case GET_APPS_FAIL:
      return {
        ...state,
        error: action.payload,
        isRetrieving: false,
        isRetrieved: false,
      };

    default:
      return state;
  }
};
export default appsListReducer;
