import axios from "../../axios";
import {
  DELETE_APP_SUCCESS,
  DELETE_APP_FAIL,
  START_DELETING_APP,
  CLEAR_DELETE_APP_STATE,
} from "./actionTypes";

const startDeletingApp = () => ({
  type: START_DELETING_APP,
});

const deleteAppSuccess = (response) => ({
  type: DELETE_APP_SUCCESS,
  payload: response.data.data,
});

const deleteAppFail = (error) => ({
  type: DELETE_APP_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const clearState = () => ({
  type: CLEAR_DELETE_APP_STATE,
});

const deleteApp = (appID) => (dispatch) => {
  dispatch(startDeletingApp());

  return axios
    .delete(`/apps/${appID}`)
    .then((response) => dispatch(deleteAppSuccess(response)))
    .catch((error) => {
      dispatch(deleteAppFail(error));
    });
};

export default deleteApp;
export { clearState };
