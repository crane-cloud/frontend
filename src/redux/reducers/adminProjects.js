import {
  FETCH_ADMIN_PROJECTS_SUCCESS,
  FETCH_ADMIN_PROJECTS_FAILED,
  IS_FETCHING,
} from "../actions/actionTypes";

const initialState = {
  projects: [],
  pagination:{},
  isRetrieving: false,
  isRetrieved: false,
  message: "No Projects Yet.",
};

const adminProjectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMIN_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload.projects,
        pagination: action.payload.pagination,
        isRetrieved: true,
        isRetrieving: false,
        message: "All Projects fetched",
      };

    case IS_FETCHING:
      return {
        ...state,
        isRetrieved: false,
        isRetrieving: true,
      };

    case FETCH_ADMIN_PROJECTS_FAILED:
      return {
        ...state,
        message: action.payload,
        isRetrieved: false,
        isRetrieving: false,
        pagination: {},
      };

    default:
      return state;
  }
};
export default adminProjectsReducer;
