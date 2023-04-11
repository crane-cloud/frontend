import adminProjectsReducer from "../adminProjects";
import {
  FETCH_ADMIN_PROJECTS_SUCCESS,
  FETCH_ADMIN_PROJECTS_FAILED,
  IS_FETCHING,
} from "../../actions/actionTypes";

const initialState = {
  projects: [],
  pagination:{},
  isRetrieving: false,
  isRetrieved: false,
  message: "No Projects Yet.",
};

const fetchAction = {
  type: FETCH_ADMIN_PROJECTS_SUCCESS,
  payload: {
    projects:[],
    pagination:{}
  }
};

const fetchFailedAction = {
  type: FETCH_ADMIN_PROJECTS_FAILED,
  message: [],
  pagination:{},
  isRetrieved: false,
  isRetrieving: false,
};

const startFetchingAction = {
  type: IS_FETCHING,
};

describe("adminProjectsReducer initial state", () => {
  it("should return the initial state", () => {
    expect(adminProjectsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle cluster added", () => {
    expect(adminProjectsReducer(initialState, fetchAction)).toEqual({
      projects: [],
      isRetrieved: true,
      isRetrieving: false,
      pagination:{},
      message: "All Projects fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(adminProjectsReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isRetrieved: false,
      isRetrieving: false,
      pagination:{},
      projects: []
    });
  });

  it("should handle adding cluster", () => {
    expect(adminProjectsReducer(initialState, startFetchingAction)).toEqual({
      isRetrieved: false,
      isRetrieving: true,
      message: "No Projects Yet.",
      pagination:{},
      projects: [],

    });
  });
});
