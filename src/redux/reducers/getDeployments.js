import {
  GET_DEPLOYMENTS_SUCCESS,
  GET_DEPLOYMENTS_FAIL,
  GETTING_DEPLOYMENTS
} from '../actions/actionTypes';

const initialState = {
  deployments: [],
  isFetchingDeployments: false,
  isFetched: false,
  message: ''
};

const getDeployments = (state = initialState, action) => {
  switch (action.type) {
  case GETTING_DEPLOYMENTS:
    return {
      ...state,
      isFetchingDeployments: true,
      isFetched: false
    };

  case GET_DEPLOYMENTS_SUCCESS:
    return {
      ...state,
      deployments: action.payload,
      isFetchingDeployments: false,
      isFetched: true
    };

  case GET_DEPLOYMENTS_FAIL:
    return {
      ...state,
      message: action.payload,
      isFetchingDeployments: false,
      isFetched: false
    };

  default:
    return state;
  }
};

export default getDeployments;
