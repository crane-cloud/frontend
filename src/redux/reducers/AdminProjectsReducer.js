
import {
  FETCH_ADMINPROJECTS_SUCCESS,
  FETCH_ADMINPROJECTS_FAILED,
  FETCH_PROJECTS
} from '../actions/actionTypes';

const initialState = {
  projects: [],
  isRetrieving: false,
  message: 'No Projects Yet.'
};

const AdminProjectsReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_ADMINPROJECTS_SUCCESS:
    return {
      ...state,
      pvcs: action.payload,
      isRetrieving: false,
      message: 'All Projects fetched'
    };

  case FETCH_PROJECTS:
    return {
      ...state,
      isRetrieving: true
    };

  case FETCH_ADMINPROJECTS_FAILED:
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
