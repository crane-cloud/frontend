import {
  GETTING_RECEIPTS,
  RECEIPTS_SUCCESS,
  RECEIPTS_FAIL,
  CLEAR_RECEIPTS,
} from "../actions/actionTypes";

const initialState = {
  receipts: [],
  isRetrievingReceipts: false,
  receiptsFetched: false,
  receiptsMessage: "Receipts Not Available",
};

const getReceiptsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIPTS_SUCCESS:
      return {
        ...state,
        receipts: action.payload,
        isRetrievingReceipts: false,
        receiptsFetched: true,
        receiptsMessage: "Receipts fetched",
      };

    case GETTING_RECEIPTS:
      return {
        ...state,
        isRetrievingReceipts: true,
      };
    case CLEAR_RECEIPTS:
      return {
        ...state,
        receipts: [],
      };

    case RECEIPTS_FAIL:
      return {
        ...state,
        receiptsMessage: action.payload,
        receiptsFetched: false,
        isRetrievingReceipts: false,
      };

    default:
      return state;
  }
};
export default getReceiptsReducer;
