import {
  ADMIN_GETTING_ALL_DATABASES,
  ADMIN_ALL_DATABASES_SUCCESS,
  ADMIN_ALL_DATABASES_FAIL,
} from "../actions/actionTypes";

const initialState = {
  databases: [],
  isFetchingDatabases: false,
  databasesFetched: false,
  databasesMessage: "Database information Not Available",
};

const adminDatabasesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_ALL_DATABASES_SUCCESS:
      return {
        ...state,
        databases: action.payload,
        isFetchingDatabases: false,
        databasesFetched: true,
        databasesMessage: "Fetched databases",
      };

    case ADMIN_GETTING_ALL_DATABASES:
      return {
        ...state,
        databasesFetched: false,
        isFetchingDatabases: true,
      };

    case ADMIN_ALL_DATABASES_FAIL:
      return {
        ...state,
        isFetchingDatabases: false,
        databasesFetched: false,
        databasesMessage: "Error fetching databases",
      };
    default:
      return state;
  }
};
export default adminDatabasesReducer;
