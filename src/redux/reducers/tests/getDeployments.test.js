import getDeployments from "../getDeployments";
import {
  GET_DEPLOYMENTS_SUCCESS,
  GET_DEPLOYMENTS_FAIL,
  GETTING_DEPLOYMENTS,
} from "../../actions/actionTypes";

const initialState = {
  deployments: [],
  isFetchingDeployments: false,
  isFetched: false,
  message: "",
};

const fetchAction = {
  type: GET_DEPLOYMENTS_SUCCESS,
  deployments: undefined,
  isFetchingDeployments: false,
  isFetched: true,
};

const fetchFailedAction = {
  type: GET_DEPLOYMENTS_FAIL,
  message: undefined,
  isFetched: false,
  isFetchingDeployments: false,
};

const startFetchingAction = {
  type: GETTING_DEPLOYMENTS,
};
describe("getDeployments initial state", () => {
  it("should return the initial state", () => {
    expect(getDeployments(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(getDeployments(initialState, fetchAction)).toEqual({
      deployments: undefined,
      isFetchingDeployments: false,
      isFetched: true,
      message: ""
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(getDeployments(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isFetched: false,
      isFetchingDeployments: false,
      deployments: []
    });
  });

  it("should handle adding database", () => {
    expect(getDeployments(initialState, startFetchingAction)).toEqual({
      deployments: [],
      isFetchingDeployments: true,
      isFetched: false,
      message: "",
    });
  });
});
