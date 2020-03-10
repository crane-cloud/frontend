
import {
  FETCH_ADMIN_PROJECTS_SUCCESS,
  FETCH_ADMIN_PROJECTS_FAILED,
  IS_FETCHING
} from '../actions/actionTypes';

const initialState = {
  projects: [],
  isRetrieving: false,
  message: 'No Projects Yet.'
};

const AdminProjectsReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_ADMIN_PROJECTS_SUCCESS:
    return {
      ...state,
      pvcs: action.payload,
      isRetrieving: false,
      message: 'All Projects fetched'
    };

  case IS_FETCHING:
    return {
      ...state,
      isRetrieving: true
    };

  case FETCH_ADMIN_PROJECTS_FAILED:
    return {
      ...state,
      message: action.payload,
      isRetrieving: false
    };

  default:
    return state;
  }
};
export default AdminProjectsReducer;
