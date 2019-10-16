import * as types from '../../actions/actionTypes';

const initialState = {
  organizations: []
};

const org = (state = initialState, action) => {
  switch (action.type) {
  case types.GET_ALL_ORGS_SUCCESS:
    return {
      ...state,
      organizations: action.orgs
    };

  case types.ADD_ORG:
    return {
      ...state,
      organizations: [...state.organizations, action.org]
    };

  default:
    return state;
  }
};

export default org;
