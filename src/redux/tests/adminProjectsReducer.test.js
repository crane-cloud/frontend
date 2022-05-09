import {
  FETCH_ADMIN_PROJECTS_SUCCESS,
  FETCH_ADMIN_PROJECTS_FAILED,
  IS_FETCHING,
} from "../actions/actionTypes";
import adminProjectsReducer from "../reducers/adminProjects";

const initialState = {
  projects: [],
  isRetrieving: false,
  isRetrieved: false,
  // message: "No Projects Yet.",
};

const postProject = {
  type: FETCH_ADMIN_PROJECTS_SUCCESS,
  project: "action.payload",
  isFailed: false,
  isAdded: true,
  isAdding: false,
  message: "Project Added SuccessFully",
};

const postProjectFailedAction = {
  type: FETCH_ADMIN_PROJECTS_FAILED,
  error: "action.payload.error",
};

const startFetchingAction = {
  type: IS_FETCHING,
};

describe("addProjectReducer initial state", () => {
  it("should return the initial state", () => {
    expect(
      adminProjectsReducer(
        {
          projects: [],
          isRetrieving: false,
          isRetrieved: false,
          // message: "No Projects Yet.",
        },
        {}
      )
    ).toEqual(initialState);
  });

  it("should handle FETCH_ADMIN_PROJECTS_SUCCESS", () => {
    expect(adminProjectsReducer(initialState, postProject)).toEqual({
      ...initialState,
      projects: undefined,
      isRetrieved: true,
      isRetrieving: false,
      message: "All Projects fetched",
    });
  });

  it("should handle add project FAIL", () => {
    expect(adminProjectsReducer(initialState, postProjectFailedAction)).toEqual(
      {
        ...initialState,
        isRetrieved: false,
        isRetrieving: false,
      }
    );
  });

  it("should handle POSTING_STARTED", () => {
    expect(adminProjectsReducer(initialState, startFetchingAction)).toEqual({
      ...initialState,
      isRetrieved: false,
      isRetrieving: true,
    });
  });
});
