import {
  ADMIN_GETTING_ALL_APPS,
  ADMIN_ALL_APPS_FAIL,
  ADMIN_ALL_APPS_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  apps: [],
  isFetched: false,
  isFetching: false,
  pagination:{},
  message: "No apps yet.",
};

const appsAdminListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_ALL_APPS_SUCCESS:
      return {
        ...state,
        apps: action.payload.apps,
        pagination: action.payload.pagination,
        isFetching: false,
        isFetched: true,
        message: "apps successfully fetched",
      };

    case ADMIN_GETTING_ALL_APPS:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
      };

    case ADMIN_ALL_APPS_FAIL:
      return {
        ...state,
        message: action.payload,
        isFetching: false,
        isFetched: false,
        pagination: {},
      };

    default:
      return state;
  }
};
export default appsAdminListReducer;
