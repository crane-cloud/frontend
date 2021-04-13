import {
  CREATE_DATABASE_SUCCESS,
  CREATE_DATABASE_FAIL,
  START_CREATING_DATABASE,
  CLEAR_ADD_DATABASE_STATE
} from '../actions/actionTypes';

const initialState = {
  database: null,
  isCreated: false,
  isCreating: false,
  message: '',
  errorCode: null
};

const createDatabaseReducer = (state = initialState, action) => {
  switch (action.type) {
  case CREATE_DATABASE_SUCCESS:
    return {
      ...state,
      database: action.payload,
      isCreating: false,
      isCreated: true,
      message: 'Success! Your database has been created.',
      errorCode: null
    };

  case START_CREATING_DATABASE:
    return {
      ...state,
      database: null,
      isCreating: true,
      isCreated: false,
      message: '',
      errorCode: null
    };

  case CREATE_DATABASE_FAIL:
    return {
      ...state,
      database: null,
      isCreating: false,
      isCreated: false,
      message: 'Deployment failed. Please try again',
      errorCode: action.payload.errorCode
    };

  case CLEAR_ADD_DATABASE_STATE:
    return {
      ...state,
      database: null,
      isCreated: false,
      isCreating: false,
      message: '',
      errorCode: null
    };

  default:
    return state;
  }
};

export default createDatabaseReducer;
