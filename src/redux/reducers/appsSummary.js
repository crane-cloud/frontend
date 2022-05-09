import {
  GETTING_APPS_SUMMARY,
  APPS_SUMMARY_SUCCESS,
  APPS_SUMMARY_FAIL,
} from "../actions/actionTypes";

const initialState = {
  FetchedAppsSummary: false,
  isFetchingAppsSummary: false,
  message: "",
  errorCode: null,
};

const appsSummaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPS_SUMMARY_SUCCESS: {
      return {
        ...state,
        summary: action.payload,
        summaryIsFailed: false,
        FetchedAppsSummary: true,
        isFetchingAppsSummary: false,
        message: "Summary got!",
        errorCode: null,
      };
    }
    case GETTING_APPS_SUMMARY:
      return {
        ...state,
        FetchedAppsSummary: false,
        isFetchingAppsSummary: true,
        errorCode: null,
        summaryIsFailed: false,
      };
    case APPS_SUMMARY_FAIL:
      return {
        ...state,
        summaryIsFailed: true,
        FetchedAppsSummary: false,
        isFetchingAppsSummary: false,
        errorCode: action.payload?.errorCode,
        message: "Summary Failed",
      };

    default:
      return state;
  }
};

export default appsSummaryReducer;
