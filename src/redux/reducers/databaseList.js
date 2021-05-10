import {
  FETCH_PROJECT_DATABASES_SUCCESS,
  FETCH_PROJECT_DATABASES_FAILED,
  IS_FETCHING_PROJECT_DATABASES,
  CLEAR_PROJECT_DATABASES,
} from "../actions/actionTypes";

const initialState = {
  databases: [],
  isFetchingDatabases: false,
  databasesFetched: false,
  databasesMessage: "Databases Not Available",
};

const projectDatabasesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT_DATABASES_SUCCESS:
      return {
        ...state,
        databases: action.payload,
        isFetchingDatabases: false,
        databasesFetched: true,
        databasesMessage: "Fetched project databases",
      };

    case IS_FETCHING_PROJECT_DATABASES:
      return {
        ...state,
        databasesFetched: false,
        isFetchingDatabases: true,
      };

    case FETCH_PROJECT_DATABASES_FAILED:
      return {
        ...state,
        isFetchingDatabases: false,
        databasesFetched: false,
        databasesMessage: "Error fetching project databases",
      };

    case CLEAR_PROJECT_DATABASES:
      return {
        ...state,
        databases: [],
        isFetchingDatabases: false,
        databasesFetched: false,
        databasesMessage: "",
      };

    default:
      return state;
  }
};
export default projectDatabasesReducer;
