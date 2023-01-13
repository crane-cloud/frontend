import adminProjectsReducer from "../adminProjects";
import {
  FETCH_ADMIN_PROJECTS_SUCCESS,
  FETCH_ADMIN_PROJECTS_FAILED,
  IS_FETCHING,
} from "../../actions/actionTypes";

const initialState = {
  projects: [],
  isRetrieving: false,
  isRetrieved: false,
  message: "No Projects Yet.",
};

const fetchAction = {
  type: FETCH_ADMIN_PROJECTS_SUCCESS,
  projects: undefined,
  isRetrieved: true,
  isRetrieving: false,
  message: "All Projects fetched",
};

const fetchFailedAction = {
  type: FETCH_ADMIN_PROJECTS_FAILED,
  message: [],
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
      projects: undefined,
      isRetrieved: true,
      isRetrieving: false,
      message: "All Projects fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(adminProjectsReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isRetrieved: false,
      isRetrieving: false,
      projects: []
    });
  });

  it("should handle adding cluster", () => {
    expect(adminProjectsReducer(initialState, startFetchingAction)).toEqual({
      isRetrieved: false,
      isRetrieving: true,
      message: "No Projects Yet.",
      projects: [],
    });
  });
});
