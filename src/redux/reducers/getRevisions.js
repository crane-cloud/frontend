import {
  FETCH_APP_REVISIONS_SUCCESS,
  FETCH_APP_REVISIONS_FAILED,
  IS_FETCHING_APP_REVISIONS,
  CLEAR_FETCH_APP_REVISIONS,
} from "../actions/actionTypes";

const initialState = {
  revisions: [],
  isFetching: false,
  fetched: false,
  pagination: {},
  message: "App revisions not available",
};

const appRevisionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APP_REVISIONS_SUCCESS:
      return {
        ...state,
        revisions: action.payload.revisions,
        pagination: action.payload.pagination,
        isFetching: false,
        fetched: true,
        message: "App revisions fetched",
      };

    case IS_FETCHING_APP_REVISIONS:
      return {
        ...state,
        isFetching: true,
        fetched: false,
      };

    case FETCH_APP_REVISIONS_FAILED:
      return {
        ...state,
        message: action.payload.message,
        fetched: false,
        isFetching: false,
        pagination: {},
      };

    case CLEAR_FETCH_APP_REVISIONS:
      return {
        ...state,
        isFetching: false,
        fetched: false,
        message: "",
      };

    default:
      return state;
  }
};

export default appRevisionsReducer;
