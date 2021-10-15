import {
  GETTING_USERS_SUMMARY,
  USERS_SUMMARY_SUCCESS,
  USERS_SUMMARY_FAIL,
} from "../actions/actionTypes";

const initialState = {
  FetchedUsersSummary: false,
  isFetchingUsersSummary: false,
  message: "",
  errorCode: null,
};

const usersSummaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_SUMMARY_SUCCESS: {
      return {
        ...state,
        usersSummary: action.payload,
        summaryIsFailed: false,
        FetchedUsersSummary: true,
        isFetchingUsersSummary: false,
        message: "Summary got!",
        errorCode: null,
      };
    }
    case GETTING_USERS_SUMMARY:
      return {
        ...state,
        FetchedUsersSummary: false,
        isFetchingUsersSummary: true,
        errorCode: null,
        summaryIsFailed: false,
      };
    case USERS_SUMMARY_FAIL:
      return {
        ...state,
        summaryIsFailed: true,
        FetchedUsersSummary: false,
        isFetchingUsersSummary: false,
        errorCode: action.payload.errorCode,
        message: "Summary Failed",
      };

    default:
      return state;
  }
};

export default usersSummaryReducer;
