import {
  CREATE_APP_SUCCESS,
  CREATE_APP_FAIL,
  START_CREATING_APP,
  CLEAR_ADD_APP_STATE
} from '../actions/actionTypes';

const initialState = {
  app: null,
  isCreated: false,
  isCreating: false,
  attempted: false,
  message: ''
};

const createAppReducer = (state = initialState, action) => {
  switch (action.type) {
  case CREATE_APP_SUCCESS:
    return {
      ...state,
      app: action.payload,
      isCreating: false,
      isCreated: true,
      attempted: true,
      message: 'App created successfully'
    };

  case START_CREATING_APP:
    return {
      ...state,
      isCreating: true,
      isCreated: false
    };

  case CREATE_APP_FAIL:
    return {
      ...state,
      message: action.payload,
      isCreating: false,
      isCreated: false,
      attempted: true,
      errorCode: action.payload.errorCode
    };

  case CLEAR_ADD_APP_STATE:
    return {
      ...state,
      app: null,
      isCreated: false,
      isCreating: false,
      attempted: false,
      message: ''
    };

  default:
    return state;
  }
};

export default createAppReducer;
