import getReceiptsReducer from "../getReceipts";
import {
  GETTING_RECEIPTS,
  RECEIPTS_SUCCESS,
  RECEIPTS_FAIL,
  CLEAR_RECEIPTS,
} from "../../actions/actionTypes";

const initialState = {
  receipts: [],
  isRetrievingReceipts: false,
  receiptsFetched: false,
  receiptsMessage: "Receipts Not Available",
};

const fetchAction = {
  type: RECEIPTS_SUCCESS,
  receipts: undefined,
  isRetrievingReceipts: false,
  receiptsFetched: true,
  receiptsMessage: "Receipts fetched",
};

const fetchFailedAction = {
  type: RECEIPTS_FAIL,
  receiptsMessage: undefined,
  receiptsFetched: false,
  isRetrievingReceipts: false,
};

const startFetchingAction = {
  type: GETTING_RECEIPTS,
};

const clearAction = {
  type: CLEAR_RECEIPTS,
};

describe("getReceiptsReducer initial state", () => {
  it("should return the initial state", () => {
    expect(getReceiptsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle receipts added", () => {
    expect(getReceiptsReducer(initialState, fetchAction)).toEqual({
      receipts: undefined,
      isRetrievingReceipts: false,
      receiptsFetched: true,
      receiptsMessage: "Receipts fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(getReceiptsReducer(initialState, fetchFailedAction)).toEqual({
      receiptsMessage: undefined,
      receiptsFetched: false,
      isRetrievingReceipts: false,
      receipts: []
    });
  });

  it("should handle adding receipts", () => {
    expect(getReceiptsReducer(initialState, startFetchingAction)).toEqual({
      receipts: [],
      isRetrievingReceipts: true,
      receiptsFetched: false,
      receiptsMessage: "Receipts Not Available",
    });
  });

  it("should handle clear adding receipts", () => {
    expect(getReceiptsReducer(initialState, clearAction)).toEqual({
      receipts: [],
      isRetrievingReceipts: false,
      receiptsFetched: false,
      receiptsMessage: "Receipts Not Available",
    });
  });
});
