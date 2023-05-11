import getDeployments from "../getDeployments";
import {
  GET_DEPLOYMENTS_SUCCESS,
  GET_DEPLOYMENTS_FAIL,
  GETTING_DEPLOYMENTS,
} from "../../actions/actionTypes";

const initialState = {
  deployments: [],
  pagination:{},
  isFetchingDeployments: false,
  isFetched: false,
  message: "",
};

const fetchAction = {
  type: GET_DEPLOYMENTS_SUCCESS,
  payload : {
     deployments:[],
     pagination:{},
  }
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
      deployments: [],
      isFetchingDeployments: false,
      pagination:{},
      isFetched: true,
      message: ""
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(getDeployments(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isFetched: false,
      pagination:{},
      isFetchingDeployments: false,
      deployments: []
    });
  });

  it("should handle adding database", () => {
    expect(getDeployments(initialState, startFetchingAction)).toEqual({
      deployments: [],
      isFetchingDeployments: true,
      pagination:{},
      isFetched: false,
      message: "",
    });
  });
});
