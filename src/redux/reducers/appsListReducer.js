
import {
  GET_APPS,
  GET_APPS_FAIL,
  START_GETTING_APPS
} from '../actions/actionTypes';

const initialState = {
  apps: [],
  isRetrieved: false,
  isRetrieving: false,
  message: 'Apps Not Available'
};

const AppsReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_APPS:
    return {
      ...state,
      apps: action.payload,
      isRetrieving: false,
      isRetrieved: true,
      message: 'All Apps fetched'
    };

  case START_GETTING_APPS:
    return {
      ...state,
      isRetrieving: true,
      isRetrieved: false
    };

  case GET_APPS_FAIL:
    return {
      ...state,
      message: action.payload,
      isRetrieving: false,
      isRetrieved: false,
    };

  default:
    return state;
  }
};
export default AppsReducer;
