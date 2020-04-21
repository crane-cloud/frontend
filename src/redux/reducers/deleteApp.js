import {
  DELETE_APP_SUCCESS, DELETE_APP_FAIL, START_DELETING_APP, CLEAR_DELETE_APP_STATE
} from '../actions/actionTypes';

const initialState = {
  isDeleted: false,
  isDeleting: false,
  isFailed: false,
  message: '',
};

const deleteAppReducer = (state = initialState, action) => {
  switch (action.type) {
  case START_DELETING_APP:
    return {
      ...state,
      isDeleting: true,
      isDeleted: false,
      isFailed: false,
    };

  case DELETE_APP_SUCCESS:
    return {
      ...state,
      isDeleting: false,
      isDeleted: true,
      isFailed: false,
      message: 'App Deleted Successfully'
    };

  case DELETE_APP_FAIL:
    return {
      ...state,
      isDeleting: false,
      isDeleted: false,
      isFailed: true,
      message: 'Failed to delete app. Please retry'
    };

  case CLEAR_DELETE_APP_STATE:
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

export default deleteAppReducer;
