import {
  START_ADDING_PROJECT,
  CLEAR_ADD_PROJECT_STATE,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAILED,
} from "../actions/actionTypes";

const initialState = {
  isAdded: false,
  isAdding: false,
  message: "",
  errorCode: null,
};

const addProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT_SUCCESS: {
      return {
        ...state,
        project: action.payload,
        isFailed: false,
        isAdded: true,
        isAdding: false,
        message: "Project Added SuccessFully",
        errorCode: null,
      };
    }
    case START_ADDING_PROJECT:
      return {
        ...state,
        isAdded: false,
        isAdding: true,
        errorCode: null,
        isFailed: false,
      };
    case ADD_PROJECT_FAILED:
      return {
        ...state,
        isFailed: true,
        isAdded: false,
        isAdding: false,
        errorCode: action.payload.errorCode,
        message: "Failed to add Project",
      };

    case CLEAR_ADD_PROJECT_STATE:
      return {
        ...state,
        isFailed: false,
        isAdded: false,
        isAdding: false,
        errorCode: null,
        message: "",
      };

    default:
      return state;
  }
};

export default addProjectReducer;
