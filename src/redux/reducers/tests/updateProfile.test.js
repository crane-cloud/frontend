import updateProfileReducer from "../updateProfile";
import {
  START_UPDATING_PROFILE,
  CLEAR_UPDATE_PROFILE_STATE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
} from "../../actions/actionTypes";

const initialState = {
  profileUpdated: false,
  profileUpdating: false,
  errorMessage: "",
};

const fetchAction = {
  type: UPDATE_PROFILE_SUCCESS,
  profileUpdateFailed: false,
  profileUpdated: true,
  profileUpdating: false,
  errorMessage: "",
};

const fetchFailedAction = {
  type: UPDATE_PROFILE_FAIL,
  profileUpdateFailed: true,
  profileUpdated: false,
  profileUpdating: false,
  errorMessage: "Failed to update profile",
};

const startFetchingAction = {
  type: START_UPDATING_PROFILE,
};
const clearAction = {
  type: CLEAR_UPDATE_PROFILE_STATE,
};
describe("updateProfileReducer initial state", () => {
  it("should return the initial state", () => {
    expect(updateProfileReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(updateProfileReducer(initialState, fetchAction)).toEqual({
      profileUpdateFailed: false,
      profileUpdated: true,
      profileUpdating: false,
      errorMessage: "",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(updateProfileReducer(initialState, fetchFailedAction)).toEqual({
      profileUpdateFailed: true,
      profileUpdated: false,
      profileUpdating: false,
      errorMessage: "Failed to update profile",
    });
  });

  it("should handle adding database", () => {
    expect(updateProfileReducer(initialState, startFetchingAction)).toEqual({
      profileUpdated: false,
      profileUpdating: true,
      profileUpdateFailed: false,
      errorMessage: "",
    });
  });

  it("should handle clear adding database", () => {
    expect(updateProfileReducer(initialState, clearAction)).toEqual({
      profileUpdated: false,
      profileUpdating: false,
      profileUpdateFailed: false,
      errorMessage: "",
    });
  });
});
