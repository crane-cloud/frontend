import { START_ADDING_PROJECT, ADD_PROJECT_SUCCESS, ADD_PROJECT_FAILED } from '../actions/actionTypes';

const initialState = {
  isAdded: false,
  message: 'Add Project'
};

const addProjectReducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_PROJECT_SUCCESS: {
    return {
      ...state,
      project: action.payload,
      isFailed: false,
      isAdded: true,
      message: 'Project Added SuccessFully'
    };
  }
  case START_ADDING_PROJECT:
    return {
      ...state,
      isAdded: false,
      isFailed: false
    };
  case ADD_PROJECT_FAILED:
    return {
      ...state,
      isFailed: true,
      isAdded: false,
      errorOccured: action.payload.error,
      message: 'Failed to add Project'
    };

  default:
    return state;
  }
};

export default addProjectReducer;
