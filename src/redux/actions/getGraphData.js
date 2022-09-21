import axios from "../../axios";
import {
  GET_GRAPH_DATA_FAILED,
  GET_GRAPH_DATA_SUCCESS,
  GETTING_GRAPH_DATA
} from "./actionTypes";

const startFetchingBill = () => ({
  type: GETTING_GRAPH_DATA,
});

const getGraphDataSuccess = (response) => ({
  type: GET_GRAPH_DATA_SUCCESS,
  payload: response.data.data,
});

const getGraphDataFailed = (error) => ({
  type: GET_GRAPH_DATA_FAILED,
  payload: {
    status: false,
    error: error,
  },
});

const getGraphData = (projectID, billObj) => (dispatch) => {
  dispatch(startFetchingBill());

  return axios
    .post(`/projects/${projectID}/billing/info`, billObj)
    .then((response) => {
      dispatch(getGraphDataSuccess(response));
    })
    .catch((error) => {
      dispatch(getGraphDataFailed(error));
    });
};

export default getGraphData;