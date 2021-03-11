import {
  DELETE_DATABASE_SUCCESS,
  DELETE_DATABASE_FAIL,
  START_DELETING_DATABASE,
  CLEAR_DELETE_DATABASE_STATE
} from '../actions/actionTypes';

const initialState = {
  databaseDeleted: false,
  deletingDatabase: false,
  databaseDeleteFailed: false,
  dbDeleteMessage: '',
};

const deleteDatabaseReducer = (state = initialState, action) => {
  switch (action.type) {
  case START_DELETING_DATABASE:
    return {
      ...state,
      deletingDatabase: true,
      databaseDeleted: false,
      databaseDeleteFailed: false,
      dbDeleteMessage: ''
    };

  case DELETE_DATABASE_SUCCESS:
    return {
      ...state,
      deletingDatabase: false,
      DatabaseDeleted: true,
      databaseDeleteFailed: false,
      dbDeleteMessage: 'Database Deleted Successfully'
    };

  case DELETE_DATABASE_FAIL:
    return {
      ...state,
      deletingDatabase: false,
      databaseDeleted: false,
      databaseDeleteFailed: true,
      dbDeleteMessage: 'Failed to delete database. Please retry'
    };

  case CLEAR_DELETE_DATABASE_STATE:
    return {
      ...state,
      databaseDeleted: false,
      deletingDatabase: false,
      databaseDeleteFailed: false,
      dbDeleteMessage: ''
    };

  default:
    return state;
  }
};

export default deleteDatabaseReducer;
