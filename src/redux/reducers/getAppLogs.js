import {
  GET_APP_LOGS_SUCCESS,
  GET_APPS_LOGS_FAIL,
  START_GETTING_APP_LOGS,
} from "../actions/actionTypes";

const initialState = {
  logs: [],
  retrievedLogs: false,
  retrieveingLogs: false,
};

const appLogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APP_LOGS_SUCCESS:
      return {
        ...state,
        logs: action.payload,
        retrieveingLogs: false,
        retrievedLogs: true,
      };

    case START_GETTING_APP_LOGS:
      return {
        ...state,
        logs: [],
        retrievedLogs: false,
        retrieveingLogs: true,
      };

    case GET_APPS_LOGS_FAIL:
      return {
        ...state,
        logs: [],
        retrieveingLogs: false,
        retrievedLogs: false,
      };

    default:
      return state;
  }
};
export default appLogsReducer;
