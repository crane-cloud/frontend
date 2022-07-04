// Get receipts actions file
import axios from "../../axios";
import {
  GETTING_RECEIPTS,
  RECEIPTS_SUCCESS,
  RECEIPTS_FAIL,
  CLEAR_RECEIPTS,
} from "./actionTypes";

const startFetchingReceipts = () => ({
  type: GETTING_RECEIPTS,
});

const getReceiptsSuccess = (response) => ({
  type: RECEIPTS_SUCCESS,
  payload: response.data.data.billing_receipts,
});

const getReceiptsFailed = (error) => ({
  type: RECEIPTS_FAIL,
  payload: {
    status: false,
    error: error,
  },
});

export const clearReceipts = () => ({
  type: CLEAR_RECEIPTS,
});

const getReceipts = (projectID) => (dispatch) => {
  dispatch(startFetchingReceipts());

  return axios
    .get(`/projects/${projectID}/receipts`)
    .then((response) => {
      dispatch(getReceiptsSuccess(response));
    })
    .catch((error) => {
      dispatch(getReceiptsFailed(error));
    });
};

export default getReceipts;