import { CREATE_APP_SUCCESS, CREATE_APP_FAIL, START_CREATING_APP } from '../actions/actionTypes';

const initialState = {
  app: null,
  isCreated: false,
  isCreating: false,
  message: 'Oops! App not created'
};

const createAppReducer = (state = initialState, action) => {
  switch (action.type) {
  case CREATE_APP_SUCCESS:
    return {
      ...state,
      app: action.payload,
      isCreating: false,
      isCreated: true,
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
    };

  default:
    return state;
  }
};

export default createAppReducer;
