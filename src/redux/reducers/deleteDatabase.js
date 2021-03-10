import {
  DELETE_DATABASE_SUCCESS,
  DELETE_DATABASE_FAIL,
  START_DELETING_DATABASE,
  CLEAR_DELETE_DATABASE_STATE
} from '../actions/actionTypes';

const initialState = {
  isDeleted: false,
  isDeleting: false,
  isFailed: false,
  message: '',
};

const deleteDatabaseReducer = (state = initialState, action) => {
  switch (action.type) {
  case START_DELETING_DATABASE:
    return {
      ...state,
      isDeleting: true,
      isDeleted: false,
      isFailed: false,
      message: ''
    };

  case DELETE_DATABASE_SUCCESS:
    return {
      ...state,
      isDeleting: false,
      isDeleted: true,
      isFailed: false,
      message: 'Database Deleted Successfully'
    };

  case DELETE_DATABASE_FAIL:
    return {
      ...state,
      isDeleting: false,
      isDeleted: false,
      isFailed: true,
      message: 'Failed to delete app. Please retry'
    };

  case CLEAR_DELETE_DATABASE_STATE:
    return {
      ...state,
      isDeleted: false,
      isDeleting: false,
      isFailed: false,
      message: ''
    };

  default:
    return state;
  }
};

export default deleteDatabaseReducer;
