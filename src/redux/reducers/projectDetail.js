
import {
  GET_PROJECT_DETAIL_SUCCESS,
  GET_PROJECT_DETAIL_FAIL,
  START_GETTING_PROJECT_DETAIL
} from '../actions/actionTypes';

const initialState = {
  project: [],
  isFetched: false,
  isFetching: false,
  message: ''
};

const projectDetailReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_PROJECT_DETAIL_SUCCESS:
    return {
      ...state,
      project: action.payload,
      isFetching: false,
      isFetched: true,
      message: 'project detail fetched'
    };

  case START_GETTING_PROJECT_DETAIL:
    return {
      ...state,
      isFetching: true,
      isFetched: false,
    };

  case GET_PROJECT_DETAIL_FAIL:
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
export default projectDetailReducer;
