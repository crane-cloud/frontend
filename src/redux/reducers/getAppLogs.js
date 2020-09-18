
import {
  GET_APP_LOGS_SUCCESS, GET_APPS_LOGS_FAIL, START_GETTING_APP_LOGS
} from '../actions/actionTypes';

const initialState = {
  logs: [],
  isRetrieved: false,
  isRetrieving: false
};

const appLogsReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_APP_LOGS_SUCCESS:
    return {
      ...state,
      logs: action.payload,
      isRetrieving: false,
      isRetrieved: true
    };

  case START_GETTING_APP_LOGS:
    return {
      ...state,
      isRetrieved: false,
      isRetrieving: true,
    };

  case GET_APPS_LOGS_FAIL:
    return {
      ...state,
      isRetrieving: false,
      isRetrieved: false,
    };

  default:
    return state;
  }
};
export default appLogsReducer;
