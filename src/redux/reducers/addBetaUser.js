import {
  ADDING_BETA_USER,
  ADD_BETA_USER_SUCCESS,
  ADD_BETA_USER_FAIL,
} from "../actions/actionTypes";

const initialState = {
  isAdded: false,
  isFailed: false,
  isAdding: false,
  user: null,
  error: null,
  message: "",
};

const addBetaUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BETA_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAdding: false,
        isFailed: false,
        isAdded: true,
        message: "User Added Successfully",
      };

    case ADDING_BETA_USER:
      return {
        ...state,
        isAdding: true,
        isAdded: false,
      };

    case ADD_BETA_USER_FAIL:
      return {
        ...state,
        isFailed: true,
        isAdded: false,
        isAdding: false,
        error: action.payload.error,
        message: "Failed to add user",
      };

    default:
      return state;
  }
};

export default addBetaUserReducer;
