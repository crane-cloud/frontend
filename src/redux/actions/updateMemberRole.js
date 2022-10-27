import axios from "../../axios";
import {
    UPDATE_MEMBER_ROLE_SUCCESS,
    UPDATE_MEMBER_ROLE_FAIL,
    START_UPDATING_MEMBER_ROLE,
    CLEAR_UPDATE_MEMBER_ROLE_STATE,
  } from "../actions/actionTypes";

const startUpdatingMemberRole = () => ({
    type: START_UPDATING_MEMBER_ROLE,
});

const updateMemberRoleSuccess = (response) => ({
    type: UPDATE_MEMBER_ROLE_SUCCESS,
    payload: response.data.data,
});

const updateMemberRoleFail = (error) => ({
    type: UPDATE_MEMBER_ROLE_FAIL,
    payload: {
        error: error,
    },
});

const clearUpdateMemberRoleState = () => ({
    type: CLEAR_UPDATE_MEMBER_ROLE_STATE,
});

const updateMemberRole = (memberInfo, ProjectID) => (dispatch) => {
    dispatch(startUpdatingMemberRole());

    return axios.patch(`/projects/${ProjectID}/users`, memberInfo).then((response)=> dispatch(updateMemberRoleSuccess(response))).catch((error)=> { dispatch(updateMemberRoleFail(error));});
};

export { clearUpdateMemberRoleState };

export default updateMemberRole;