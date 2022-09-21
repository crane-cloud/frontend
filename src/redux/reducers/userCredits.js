import {
  GETTING_USER_CREDITS,
  GET_USER_CREDITS_FAIL,
  GET_USER_CREDITS_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  credits: [],
  isFetchedCredits: false,
  isFetchingCredits: false,
  message: "",
};

const userCreditsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_CREDITS_SUCCESS:
      return {
        ...state,
        credits: action.payload,
        isFetchingCredits: false,
        isFetchedCredits: true,
        message: "User credits fetched",
      };

    case GETTING_USER_CREDITS:
      return {
        ...state,
        isFetchingCredits: true,
        isFetchedCredits: false,
      };

    case GET_USER_CREDITS_FAIL:
      return {
        ...state,
        message: action.payload,
        isFetchingCredits: false,
        isFetchedCredits: false,
      };

    default:
      return state;
  }
};
export default userCreditsReducer;
