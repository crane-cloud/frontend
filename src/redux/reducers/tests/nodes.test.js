import NodesReducer from "../nodes";
import {
  START_GETTING_NODES,
  GET_NODES_FAIL,
  GET_NODES_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  nodes: [],
  isRetrieving: false,
  isRetrieved: false,
  message: "Nodes Not Available",
};

const fetchAction = {
  type: GET_NODES_SUCCESS,
  nodes: undefined,
  isRetrieving: false,
  isRetrieved: true,
  message: "All Namespaces in this Cluster fetched",
};

const fetchFailedAction = {
  type: GET_NODES_FAIL,
  message: undefined,
  isRetrieved: false,
  isRetrieving: false,
};

const startFetchingAction = {
  type: START_GETTING_NODES,
};
describe("NodesReducer initial state", () => {
  it("should return the initial state", () => {
    expect(NodesReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle nodes added", () => {
    expect(NodesReducer(initialState, fetchAction)).toEqual({
      nodes: [],
      jobs: undefined,
      isRetrieving: false,
      isRetrieved: true,
      message: "All Namespaces in this Cluster fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(NodesReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isRetrieved: false,
      isRetrieving: false,
      nodes: [],
    });
  });

  it("should handle adding nodes", () => {
    expect(NodesReducer(initialState, startFetchingAction)).toEqual({
      nodes: [],
      isRetrieving: true,
      isRetrieved: false,
      message: "Nodes Not Available",
    });
  });
});
