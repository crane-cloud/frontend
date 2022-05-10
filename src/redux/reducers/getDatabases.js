import {
    GETTING_ALL_DATABASES,
    ALL_DATABASES_SUCCESS,
    ALL_DATABASES_FAIL,
  } from "../actions/actionTypes";
  
  const initialState = {
    databases: [],
    isFetchingDatabases: false,
    databasesFetched: false,
    databasesMessage: "Database information Not Available",
  };
  
  const databasesReducer = (state = initialState, action) => {
    switch (action.type) {
      case ALL_DATABASES_SUCCESS:
        return {
          ...state,
          databases: action.payload,
          isFetchingDatabases: false,
          databasesFetched: true,
          databasesMessage: "Fetched databases",
        };
  
      case GETTING_ALL_DATABASES:
        return {
          ...state,
          databasesFetched: false,
          isFetchingDatabases: true,
        };
  
      case ALL_DATABASES_FAIL:
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
  export default databasesReducer;
