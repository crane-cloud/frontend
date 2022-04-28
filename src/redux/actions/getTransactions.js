import axios from "../../axios";
import {
  GETTING_TRANSACTIONS,
  TRANSACTIONS_FAIL,
  TRANSACTIONS_SUCCESS,
} from "./actionTypes";

const startFetchingDatabases = () => ({
  type: GETTING_TRANSACTIONS,
});

const getTransactionsSuccess = (response) => ({
  type: TRANSACTIONS_SUCCESS,
  payload: response.data,
});

const getTransactionsFailed = (error) => ({
  type: TRANSACTIONS_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const getTransactions = (projectID) => (dispatch) => {
  dispatch(startFetchingDatabases());

  return axios
    .get(`/projects/${projectID}/transactions`)
    .then((response) => {
      dispatch(getTransactionsSuccess(response));
    })
    .catch((error) => {
      dispatch(getTransactionsFailed(error));
    });
};

export default getTransactions;
