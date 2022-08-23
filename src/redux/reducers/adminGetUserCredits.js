import {
  ADMIN_GET_USER_CREDITS_FAIL,
  ADMIN_GET_USER_CREDITS_SUCCESS,
  ADMIN_GETTING_USER_CREDITS,
  ADMIN_CLEAR_USER_CREDITS,

} from "../actions/actionTypes";

const initialState = {
  userCredits: [],
  creditsFetched: false,
  isFetchingCredits: false,
  message: "",
};

const adminGetUserCreditsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_GET_USER_CREDITS_SUCCESS:
      return {
        ...state,
        userCredits: action.payload,
        isFetchingCredits: false,
        creditsFetched: true,
        message: "User credits fetched",
      };

    case ADMIN_GETTING_USER_CREDITS:
      return {
        ...state,
        isFetchingCredits: true,
        creditsFetched: false,
      };

    case ADMIN_GET_USER_CREDITS_FAIL:
      return {
        ...state,
        message: action.payload,
        isFetchingCredits: false,
        creditsFetched: false,
      };

    case ADMIN_CLEAR_USER_CREDITS:
      return {
        ...state,
        userCredits: [],
        isFetchingCredits: false,
        creditsFetched: false,
        message: "",
      };

    default:
      return state;
  }
};
export default adminGetUserCreditsReducer;
