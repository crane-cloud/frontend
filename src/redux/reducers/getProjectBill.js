import {
  GETTING_PROJECT_BILLING_INFO,
  PROJECT_BILLING_INFO_SUCCESS,
  PROJECT_BILLING_INFO_FAIL,
} from "../actions/actionTypes";

const initialState = {
  projectBill: [],
  isRetrieving: false,
  isFetched: false,
  message: "Project Bill Information Not Available",
};

const getProjectBillReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECT_BILLING_INFO_SUCCESS:
      return {
        ...state,
        projectBill: action.payload,
        isRetrieving: false,
        isFetched: true,
        message: "Project Bill fetched",
      };

    case GETTING_PROJECT_BILLING_INFO:
      return {
        ...state,
        isRetrieving: true,
      };

    case PROJECT_BILLING_INFO_FAIL:
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
export default getProjectBillReducer;