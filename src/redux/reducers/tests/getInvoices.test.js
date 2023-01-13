import getInvoicesReducer from "../getInvoices";
import {
  GETTING_INVOICES,
  INVOICES_SUCCESS,
  INVOICES_FAIL,
  CLEAR_INVOICES,
} from "../../actions/actionTypes";

const initialState = {
  invoices: [],
  isRetrievingInvoices: false,
  invoicesFetched: false,
  invoicesMessage: "Invoices Not Available",
};

const fetchAction = {
  type: INVOICES_SUCCESS,
  invoices: undefined,
  isRetrievingInvoices: false,
  invoicesFetched: true,
  invoicesMessage: "Invoices fetched",
};

const fetchFailedAction = {
  type: INVOICES_FAIL,
  invoicesMessage: undefined,
  invoicesFetched: false,
  isRetrievingInvoices: false,
};

const startFetchingAction = {
  type: GETTING_INVOICES,
};

const clearAction = {
  type: CLEAR_INVOICES,
};

describe("getInvoicesReducer initial state", () => {
  it("should return the initial state", () => {
    expect(getInvoicesReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(getInvoicesReducer(initialState, fetchAction)).toEqual({
      invoices: undefined,
      isRetrievingInvoices: false,
      invoicesFetched: true,
      invoicesMessage: "Invoices fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(getInvoicesReducer(initialState, fetchFailedAction)).toEqual({
      invoicesMessage: undefined,
      invoicesFetched: false,
      isRetrievingInvoices: false,
      invoices: []
    });
  });

  it("should handle adding database", () => {
    expect(getInvoicesReducer(initialState, startFetchingAction)).toEqual({
      isRetrievingInvoices: true,
      invoices: [],
      invoicesFetched: false,
      invoicesMessage: "Invoices Not Available"
    });
  });

  it("should handle clear adding database", () => {
    expect(getInvoicesReducer(initialState, clearAction)).toEqual({
      invoices: [],
      isRetrievingInvoices: false,
      invoicesFetched: false,
      invoicesMessage: "Invoices Not Available",
    });
  });
});
