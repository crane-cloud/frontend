import {
  GETTING_TRANSACTIONS,
  TRANSACTIONS_FAIL,
  TRANSACTIONS_SUCCESS,
  CLEAR_TRANSACTIONS,
} from "../actions/actionTypes";

const initialState = {
  transactions: [],
  isRetrieving: false,
  isFetched: false,
  message: "Transactions Not Available",
};

const getTransactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
        isRetrieving: false,
        isFetched: true,
        message: "Transactions fetched",
      };

    case GETTING_TRANSACTIONS:
      return {
        ...state,
        isRetrieving: true,
      };
    case CLEAR_TRANSACTIONS:
        return {
          ...state,
          transactions: [],
    };

    case TRANSACTIONS_FAIL:
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
export default getTransactionsReducer;
