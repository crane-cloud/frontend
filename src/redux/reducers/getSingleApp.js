import {
  GETTING_SINGLE_APP,
  SINGLE_APP_FAIL,
  SINGLE_APP_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  app: [],
  isRetrieving: false,
  isFetched: false,
  message: "App Not Available",
};

const singleAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SINGLE_APP_SUCCESS:
      return {
        ...state,
        app: action.payload,
        isRetrieving: false,
        isFetched: true,
        message: "Single App fetched",
      };

    case GETTING_SINGLE_APP:
      return {
        ...state,
        isRetrieving: true,
      };

    case SINGLE_APP_FAIL:
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
export default singleAppReducer;
