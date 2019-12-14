import * as types from '../actionTypes';

function getUsersOrganizationsSuccess(orgs) {
  return { type: types.GET_ALL_ORGS_SUCCESS, orgs };
}

function addOrgSuccess(org) {
  return { type: types.ADD_ORG, org };
}

/* THUNK */
export const storeOrganizations = (organizations) => (dispatch, /* getState */) => {
  dispatch(getUsersOrganizationsSuccess(organizations));
};

export const addOrganization = (org) => (dispatch, /* getState */) => {
  dispatch(addOrgSuccess(org));
};
