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
      }

    default:
      return state;
  }
}

export default org;