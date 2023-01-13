import {
  CREATE_APP_SUCCESS,
  CREATE_APP_FAIL,
  START_CREATING_APP,
  CLEAR_ADD_APP_STATE,
} from "../actions/actionTypes";

const initialState = {
  app: null,
  isCreated: false,
  isCreating: false,
  message: "",
  errorCode: null,
};

const createAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_APP_SUCCESS:
      return {
        ...state,
        app: action.payload,
        isCreating: false,
        isCreated: true,
        message: "Success! Your app has been deployed.",
        errorCode: null,
      };

    case START_CREATING_APP:
      return {
        ...state,
        app: null,
        isCreating: true,
        isCreated: false,
        message: "",
        errorCode: null,
      };

    case CREATE_APP_FAIL:
      return {
        ...state,
        app: null,
        isCreating: false,
        isCreated: false,
        message: "Deployment failed. Please try again",
        errorCode: action.payload?.errorCode,
      };

    case CLEAR_ADD_APP_STATE:
      return {
        ...state,
        app: null,
        isCreated: false,
        isCreating: false,
        message: "",
        errorCode: null,
      };

    default:
      return state;
  }
};

export default createAppReducer;
