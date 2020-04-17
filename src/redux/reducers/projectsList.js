
import {
  FETCH_USER_PROJECTS_SUCCESS,
  FETCH_USER_PROJECTS_FAILED,
  IS_FETCHING
} from '../actions/actionTypes';

const initialState = {
  projects: [],
  isRetrieving: false,
  message: 'You have Projects Yet.'
};

const ProjectsListReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_USER_PROJECTS_SUCCESS:
    return {
      ...state,
      projects: action.payload,
      isRetrieving: false,
      message: 'All your Projects are fetched'
    };

  case IS_FETCHING:
    return {
      ...state,
      isRetrieving: true
    };

  case FETCH_USER_PROJECTS_FAILED:
    return {
      ...state,
      message: action.payload,
      isRetrieving: false
    };

  default:
    return state;
  }
};
export default ProjectsListReducer;
