import {
  GETTING_USER_CREDITS,
  GET_USER_CREDITS_FAIL,
  GET_USER_CREDITS_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  userCredits: [],
  isFetched: false,
  isFetching: false,
  message: "",
};

const adminGetUserCreditsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_CREDITS_SUCCESS:
      return {
        ...state,
        userCredits: action.payload,
        isFetching: false,
        isFetched: true,
        message: "User credits fetched",
      };

    case GETTING_USER_CREDITS:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
      };

    case GET_USER_CREDITS_FAIL:
      return {
        ...state,
        message: action.payload,
        isFetching: false,
        isFetched: false,
      };

    default:
      return state;
  }
};
export default adminGetUserCreditsReducer;
