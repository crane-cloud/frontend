import {
  GET_DEPLOYMENTS_SUCCESS,
  GET_DEPLOYMENTS_FAIL,
  GETTING_DEPLOYMENTS,
} from "../actions/actionTypes";

const initialState = {
  deployments: [],
  pagination:{},
  isFetchingDeployments: false,
  isFetched: false,
  message: "",
};

const getDeployments = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_DEPLOYMENTS:
      return {
        ...state,
        isFetchingDeployments: true,
      };

    case GET_DEPLOYMENTS_SUCCESS:
      return {
        ...state,
        deployments: action.payload.deployments,
        isFetchingDeployments: false,
        pagination:action.payload.pagination,
        isFetched: true,
      };

    case GET_DEPLOYMENTS_FAIL:
      return {
        ...state,
        message: action.payload,
        isFetched: false,
        isFetchingDeployments: false,
        pagination:{},
      };

    default:
      return state;
  }
};

export default getDeployments;
