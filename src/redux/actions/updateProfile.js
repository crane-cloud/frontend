import axios from "../../axios";
import {
    START_UPDATING_PROFILE,
    CLEAR_UPDATE_PROFILE_STATE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
} from "./actionTypes";

const startUpdatingProfile = () => ({
  type: START_UPDATING_PROFILE,
});

export const updateProfileSuccess = (response) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: response.data,
});

export const updateProfileFail = (error) => ({
  type: UPDATE_PROFILE_FAIL,
  payload: {
    status: false,
    errorCode: error.response.status,
  },
});

export const clearUpdateProfileState = () => ({
  type: CLEAR_UPDATE_PROFILE_STATE,
});

export const updateProfile = (userID, ProfileData) => (dispatch) => {
  dispatch(startUpdatingProfile());

  return axios
    .patch(`/users/${userID}`, ProfileData)
    .then((response) => dispatch(updateProfileSuccess(response)))
    .catch((error) => {
      dispatch(updateProfileFail(error));
    });
};


