import {
  GETTING_PASSWORD,
  PASSWORD_FAIL,
  PASSWORD_SUCCESS,
} from "../actions/actionTypes";
const initialState = {
  password: [],
  isRetrieving: false,
  isFetched: false,
  message: "Database Not Available",
};

const passwordReducer = (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_SUCCESS:
      return {
        ...state,
        password: action.payload,
        isRetrieving: false,
        isFetched: true,
        message: "Password fetched",
      };

    case GETTING_PASSWORD:
      return {
        ...state,
        isRetrieving: true,
      };

    case PASSWORD_FAIL:
      return {
        ...state,
        message: action.payload,
        isFetched: false,
        isRetrieving: false,
      };

    default:
      return state;
  }
};
export default passwordReducer;
