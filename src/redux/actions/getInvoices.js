// Get invoices actions file
import axios from "../../axios";
import {
  GETTING_INVOICES,
  INVOICES_SUCCESS,
  INVOICES_FAIL,
  CLEAR_INVOICES,
} from "./actionTypes";

const startFetchingInvoices = () => ({
  type: GETTING_INVOICES,
});

const getInvoicesSuccess = (response) => ({
  type: INVOICES_SUCCESS,
  payload: response.data.data.billing_invoice,
});

const getInvoicesFailed = (error) => ({
  type: INVOICES_FAIL,
  payload: {
    status: false,
    error: error,
  },
});

export const clearInvoices = () => ({
  type: CLEAR_INVOICES,
});

const getInvoices = (projectID) => (dispatch) => {
  dispatch(startFetchingInvoices());

  return axios
    .get(`/projects/${projectID}/invoices`)
    .then((response) => {
      dispatch(getInvoicesSuccess(response));
    })
    .catch((error) => {
      dispatch(getInvoicesFailed(error));
    });
};

export default getInvoices;