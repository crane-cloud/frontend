import axios from "../../axios";
import {
  START_UPDATING_APP,
  CLEAR_UPDATE_APP_STATE,
  UPDATE_APP_SUCCESS,
  UPDATE_APP_FAIL,
} from "./actionTypes";

const startUpdatingApp = () => ({
  type: START_UPDATING_APP,
});

export const updateAppSuccess = (response) => ({
  type: UPDATE_APP_SUCCESS,
  payload: response.data,
});

export const updateAppFail = (error) => ({
  type: UPDATE_APP_FAIL,
  payload: {
    status: false,
    errorCode: error.response.status,
  },
});

const clearUpdateAppState = () => ({
  type: CLEAR_UPDATE_APP_STATE,
});

const updateApp = (appID, appData) => (dispatch) => {
  dispatch(startUpdatingApp());

  return axios
    .patch(`/apps/${appID}`, appData)
    .then((response) => dispatch(updateAppSuccess(response)))
    .catch((error) => {
      dispatch(updateAppFail(error));
    });
};
export { clearUpdateAppState };

export default updateApp;
