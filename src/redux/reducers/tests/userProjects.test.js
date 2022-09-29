import userProjectsReducer from "../userProjects";
import {
  FETCH_USER_PROJECTS_SUCCESS,
  FETCH_USER_PROJECTS_FAILED,
  IS_FETCHING,
} from "../../actions/actionTypes";

const initialState = {
  projects: [],
  isRetrieving: false,
  isFetched: false,
  message: "You have Projects Yet.",
};

const fetchAction = {
  type: FETCH_USER_PROJECTS_SUCCESS,
  projects: undefined,
  isFetched: true,
  isRetrieving: false,
  message: "All your Projects are fetched",
};

const fetchFailedAction = {
  type: FETCH_USER_PROJECTS_FAILED,
  isFetched: false,
  message: undefined,
  isRetrieving: false,
};

const startFetchingAction = {
  type: IS_FETCHING,
};
describe("userProjectsReducer initial state", () => {
  it("should return the initial state", () => {
    expect(userProjectsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(userProjectsReducer(initialState, fetchAction)).toEqual({
      projects: undefined,
      isFetched: true,
      isRetrieving: false,
      message: "All your Projects are fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(userProjectsReducer(initialState, fetchFailedAction)).toEqual({
      isFetched: false,
      message: undefined,
      isRetrieving: false,
      projects: []
    });
  });

  it("should handle adding database", () => {
    expect(userProjectsReducer(initialState, startFetchingAction)).toEqual({
      projects: [],
      isRetrieving: true,
      isFetched: false,
      message: "You have Projects Yet.",
    });
  });
});
