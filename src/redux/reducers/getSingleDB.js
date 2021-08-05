import {
  GETTING_SINGLE_DATABASE,
  SINGLE_DATABASE_FAIL,
  SINGLE_DATABASE_SUCCESS,
} from "../actions/actionTypes";
const initialState = {
  database: [],
  isRetrieving: false,
  isFetched: false,
  message: "Database Not Available",
};

const singleDBReducer = (state = initialState, action) => {
  switch (action.type) {
    case SINGLE_DATABASE_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
        isRetrieving: false,
        isFetched: true,
        message: "Single DB fetched",
      };

    case GETTING_SINGLE_DATABASE:
      return {
        ...state,
        isRetrieving: true,
      };

    case SINGLE_DATABASE_FAIL:
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
export default singleDBReducer;
