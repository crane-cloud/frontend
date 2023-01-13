import getTransactionsReducer from "../getTransactions";
import {
  GETTING_TRANSACTIONS,
  TRANSACTIONS_FAIL,
  TRANSACTIONS_SUCCESS,
  CLEAR_TRANSACTIONS,
} from "../../actions/actionTypes";

const initialState = {
  transactions: [],
  isRetrieving: false,
  isFetched: false,
  message: "Transactions Not Available",
};

const fetchAction = {
  type: TRANSACTIONS_SUCCESS,
  transactions: undefined,
  isRetrieving: false,
  isFetched: true,
  message: "Transactions fetched",
};

const fetchFailedAction = {
  type: TRANSACTIONS_FAIL,
  message: undefined,
  isFetched: false,
  isRetrieving: false,
};

const startFetchingAction = {
  type: GETTING_TRANSACTIONS,
};

const clearAction = {
  type: CLEAR_TRANSACTIONS,
};

describe("getTransactionsReducer initial state", () => {
  it("should return the initial state", () => {
    expect(getTransactionsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle transactions added", () => {
    expect(getTransactionsReducer(initialState, fetchAction)).toEqual({
      transactions: undefined,
      isRetrieving: false,
      isFetched: true,
      message: "Transactions fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(getTransactionsReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isFetched: false,
      isRetrieving: false,
      transactions: [],
    });
  });

  it("should handle adding transactions", () => {
    expect(getTransactionsReducer(initialState, startFetchingAction)).toEqual({
      transactions: [],
      isRetrieving: true,
      isFetched: false,
      message: "Transactions Not Available",
    });
  });

  it("should handle clear adding transactions", () => {
    expect(getTransactionsReducer(initialState, clearAction)).toEqual({
      transactions: [],
      isRetrieving: false,
      isFetched: false,
      message: "Transactions Not Available",
    });
  });
});
