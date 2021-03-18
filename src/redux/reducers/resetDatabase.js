import {
  RESET_DATABASE_SUCCESS,
  RESET_DATABASE_FAIL,
  START_RESETING_DATABASE,
  CLEAR_RESET_DATABASE_STATE
} from '../actions/actionTypes';

const initialState = {
  isReset: false,
  isReseting: false,
  resetFailed: false,
  resetMessage: '',
};

const resetDatabaseReducer = (state = initialState, action) => {
  switch (action.type) {
  case START_RESETING_DATABASE:
    return {
      ...state,
      isReseting: true,
      isReset: false,
      resetFailed: false,
      resetMessage: ''
    };

  case RESET_DATABASE_SUCCESS:
    return {
      ...state,
      isReseting: false,
      isReset: true,
      resetFailed: false,
      resetMessage: 'Database Reset Successfully'
    };

  case RESET_DATABASE_FAIL:
    return {
      ...state,
      isReseting: false,
      isReset: false,
      resetFailed: true,
      resetMessage: 'Failed to reset database. Please retry'
    };

  case CLEAR_RESET_DATABASE_STATE:
    return {
      ...state,
      isReset: false,
      isReseting: false,
      resetFailed: false,
      resetMessage: ''
    };

  default:
    return state;
  }
};

export default resetDatabaseReducer;
