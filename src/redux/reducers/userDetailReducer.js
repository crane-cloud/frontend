
import {
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_FAIL,
  START_GETTING_USER_DETAIL
} from '../actions/actionTypes';

const initialState = {
  clusters: [],
  isFetched: false,
  isFetching: false,
  message: ''
};

const UserDetailReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_USER_DETAIL_SUCCESS:
    return {
      ...state,
      clusters: action.payload,
      isFetching: false,
      isFetched: true,
      message: 'User detail fetched'
    };

  case START_GETTING_USER_DETAIL:
    return {
      ...state,
      isFetching: true,
      isFetched: false,
    };

  case GET_USER_DETAIL_FAIL:
    return {
      ...state,
      message: action.payload,
      isFetching: false,
      isFetched: false,
    };

  default:
    return state;
  }
};
export default UserDetailReducer;
