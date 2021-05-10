import axios from "../../axios";
import {
  CREATE_APP_SUCCESS,
  CLEAR_ADD_APP_STATE,
  CREATE_APP_FAIL,
  START_CREATING_APP,
} from "./actionTypes";

const startCreatingApp = () => ({
  type: START_CREATING_APP,
});

const createAppSuccess = (response) => ({
  type: CREATE_APP_SUCCESS,
  payload: response.data.data,
});

const createAppFail = (error) => ({
  type: CREATE_APP_FAIL,
  payload: {
    status: false,
    error: error.status,
    errorCode: error.response.status,
  },
});

const clearState = () => ({
  type: CLEAR_ADD_APP_STATE,
});

const createApp = (appInfo, projectID) => (dispatch) => {
  dispatch(startCreatingApp());

  return axios
    .post(`/projects/${projectID}/apps`, appInfo)
    .then((response) => dispatch(createAppSuccess(response)))
    .catch((error) => {
      dispatch(createAppFail(error));
    });
};

export default createApp;
export { clearState };
