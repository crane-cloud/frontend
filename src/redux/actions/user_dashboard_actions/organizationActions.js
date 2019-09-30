import * as types from '../actionTypes';

function getUsersOrganizationsSuccess(orgs){
  return { type: types.GET_ALL_ORGS_SUCCESS, orgs };
}

function addOrgSuccess(org){
  return { type: types.ADD_ORG, org };
}

/* THUNK */
export function storeOrganizations(organizations){
  return function(dispatch, getState){
    dispatch(getUsersOrganizationsSuccess(organizations));
  }
}

export function addOrganization(org){
  return function(dispatch, getState){
    dispatch(addOrgSuccess(org));
  }
}