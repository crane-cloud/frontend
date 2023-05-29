import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  START_GETTING_USERS,
} from "../actions/actionTypes";

const initialState = {
  users: [],
  isFetched: false,
  isFetching: false,
  pagination:{},
  message: "No users yet.",
};

const usersListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
        pagination: action.payload.pagination,
        isFetching: false,
        isFetched: true,
        message: "Users successfully fetched",
      };

    case START_GETTING_USERS:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
      };

    case GET_USERS_FAIL:
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
export default usersListReducer;
