import NodesReducer from "../nodes";
import {
  START_GETTING_NODES,
  GET_NODES_FAIL,
  GET_NODES_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  nodes: [],
  isRetrieving: false,
  isFetched: false,
  message: "Nodes Not Available",
};

const fetchAction = {
  type: GET_NODES_SUCCESS,
  nodes: undefined,
  isRetrieving: false,
  isFetched: true,
  message: "All Nodes fetched",
};

const fetchFailedAction = {
  type: GET_NODES_FAIL,
  message: undefined,
  isFetched: false,
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
      nodes:undefined,
      isRetrieving: false,
      isFetched: true,
      message: "All Nodes fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(NodesReducer(initialState, fetchFailedAction)).toEqual({
      message: undefined,
      isFetched: false,
      isRetrieving: false,
      nodes: [],
    });
  });

  it("should handle adding nodes", () => {
    expect(NodesReducer(initialState, startFetchingAction)).toEqual({
      nodes: [],
      isRetrieving: true,
      isFetched: false,
      message: "Nodes Not Available",
    });
  });
});
