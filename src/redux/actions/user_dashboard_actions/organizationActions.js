import * as types from '../actionTypes';

function getUsersOrganizationsSuccess(orgs){
  return { type: types.GET_ALL_ORGS_SUCCESS, orgs }
}

/* THUNK */
export function storeOrganizations(organizations){
  return function(dispatch, getState){
    dispatch(getUsersOrganizationsSuccess(organizations));
  }
}