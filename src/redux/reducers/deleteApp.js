import {
  DELETE_APP_SUCCESS, DELETE_APP_FAIL, START_DELETING_APP, CLEAR_DELETE_APP_STATE
} from '../actions/actionTypes';

const initialState = {
  app: null,
  isDeleted: false,
  isDeleting: false,
  message: '',
  isFailed: false,
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
      app: action.payload,
      isDeleting: false,
      isDeleted: true,
      isFailed: false,
      message: 'App Deleted Successfully'
    };

  case DELETE_APP_FAIL:
    return {
      ...state,
      message: action.payload,
      isDeleting: false,
      isDeleted: false,
      isFailed: true,
    };

  case CLEAR_DELETE_APP_STATE:
    return {
      ...state,
      app: null,
      isDeleted: false,
      isDeleting: false,
      message: '',
      isFailed: false
    };

  default:
    return state;
  }
};

export default deleteAppReducer;
