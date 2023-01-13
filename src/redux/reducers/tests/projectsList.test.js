import ProjectsListReducer from "../projectsList";
import {
  FETCH_USER_PROJECTS_SUCCESS,
  FETCH_USER_PROJECTS_FAILED,
  IS_FETCHING,
} from "../../actions/actionTypes";

const initialState = {
  projects: [],
  isRetrieving: false,
  message: "You have Projects Yet.",
};

const fetchAction = {
  type: FETCH_USER_PROJECTS_SUCCESS,
  projects: undefined,
  isRetrieving: false,
  message: "All your Projects are fetched",
};

const fetchFailedAction = {
  type: FETCH_USER_PROJECTS_FAILED,
  message: undefined,
  isFetched: false,
  isRetrieving: false,
};

const startFetchingAction = {
  type: IS_FETCHING,
};

describe("ProjectsListReducer initial state", () => {
  it("should return the initial state", () => {
    expect(ProjectsListReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle project added", () => {
    expect(ProjectsListReducer(initialState, fetchAction)).toEqual({
      projects: undefined,
      isRetrieving: false,
      message: "All your Projects are fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(ProjectsListReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isRetrieving: false,
      projects: []
    });
  });

  it("should handle adding project", () => {
    expect(ProjectsListReducer(initialState, startFetchingAction)).toEqual({
      projects: [],
      isRetrieving: true,
      message: "You have Projects Yet.",
    });
  });
});
