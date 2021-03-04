import {
  FETCH_PROJECT_DATABASES_SUCCESS,
  FETCH_PROJECT_DATABASES_FAILED,
  IS_FETCHING_PROJECT_DATABASES,
  CLEAR_PROJECT_DATABASES
} from '../actions/actionTypes';

const initialState = {
  databases: [],
  isFetchingDatabases: false,
  databasesMessage: ''
};

const projectDatabasesReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_PROJECT_DATABASES_SUCCESS:
    return {
      ...state,
      databasesMetrics: [...state.databases,
        { project: action.payload.project, databases: action.payload.databases }
      ],
      isFetchingDatabases: false,
      databasesMessage: 'Fetched project databases'
    };

  case FETCH_PROJECT_DATABASES_FAILED:
    return {
      ...state,
      databases: [...state.databases,
        { project: action.payload.project, databases: action.payload.databases }
      ],
      isFetchingDatabases: false,
      databasesMessage: 'Error fetching project databases'
    };

  case IS_FETCHING_PROJECT_DATABASES:
    return {
      ...state,
      isFetchingDatabases: true,
    };

  case CLEAR_PROJECT_DATABASES:
    return {
      ...state,
      databases: [],
      isFetchingDatabases: false,
      databasesMessage: ''
    };

  default:
    return state;
  }
};
export default projectDatabasesReducer;
