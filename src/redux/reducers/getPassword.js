import {
  GETTING_PASSWORD,
  PASSWORD_FAIL,
  PASSWORD_SUCCESS,
  CLEAR_FETCH_PASSWORD,
} from "../actions/actionTypes";
const initialState = {
  password: [],
  isRetrievingPassword: false,
  passwordFetched: false,
  message: "Database Not Available",
};

const passwordReducer = (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_SUCCESS:
      return {
        ...state,
        password: action.payload,
        isRetrievingPassword: false,
        passwordFetched: true,
        message: "Password fetched",
      };

    case GETTING_PASSWORD:
      return {
        ...state,
        isRetrievingPassword: true,
      };

    case PASSWORD_FAIL:
      return {
        ...state,
        message: action.payload,
        passwordFetched: false,
        isRetrievingPassword: false,
      };
    
    case CLEAR_FETCH_PASSWORD:
      return {
        ...state,
        isRetrievingPassword: false,
        passwordFetched: false,
        message: "",
      };

    default:
      return state;
  }
};
export default passwordReducer;
