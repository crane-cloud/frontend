import {
  GETTING_INVOICES,
  INVOICES_SUCCESS,
  INVOICES_FAIL,
  CLEAR_INVOICES,
} from "../actions/actionTypes";

const initialState = {
  invoices: [],
  isRetrievingInvoices: false,
  invoicesFetched: false,
  invoicesMessage: "Invoices Not Available",
};

const getInvoicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case INVOICES_SUCCESS:
      return {
        ...state,
        invoices: action.payload,
        isRetrievingInvoices: false,
        invoicesFetched: true,
        invoicesMessage: "Invoices fetched",
      };

    case GETTING_INVOICES:
      return {
        ...state,
        isRetrievingInvoices: true,
      };
    case CLEAR_INVOICES:
      return {
        ...state,
        invoices: [],
      };

    case INVOICES_FAIL:
      return {
        ...state,
        invoicesMessage: action.payload,
        invoicesFetched: false,
        isRetrievingInvoices: false,
      };

    default:
      return state;
  }
};
export default getInvoicesReducer;
