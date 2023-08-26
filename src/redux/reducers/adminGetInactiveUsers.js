import {
  GET_INACTIVE_USERS_FAILED,
  GET_INACTIVE_USERS_SUCCESS,
  GETTING_INACTIVE_USERS,
} from "../actions/actionTypes";

const initialState = {
  inactiveUsers: [],
  pagination: {},
  isFetchingInactiveUsers: false,
  inactiveUsersFetched: false,
  inactiveUsersMessage: "",
};

const adminInactiveUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INACTIVE_USERS_SUCCESS:
      return {
        ...state,
        inactiveUsers: action.payload.users,
        pagination: action.payload.pagination,
        isFetchingInactiveUsers: false,
        inactiveUsersFetched: true,
        inactiveUsersMessage: "Fetched inactive users",
      };

    case GETTING_INACTIVE_USERS:
      return {
        ...state,
        inactiveUsersFetched: false,
        isFetchingInactiveUsers: true,
      };

    case GET_INACTIVE_USERS_FAILED:
      return {
        ...state,
        isFetchingInactiveUsers: false,
        inactiveUsersFetched: false,
        pagination: {},
        inactiveUsersMessage: "Error fetching inactive users",
      };
    default:
      return state;
  }
};

export default adminInactiveUsersReducer;
