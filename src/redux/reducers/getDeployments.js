import { GET_DEPLOYMENTS } from '../actions/actionTypes';

const initialState = {
  deployments: []
};

const getDeployments = (state = initialState, action) => {
  switch (action.type) {
  case GET_DEPLOYMENTS:
    return {
      ...state,
      deployments: action.payload
    };

  default:
    return state;
  }
};

export default getDeployments;
