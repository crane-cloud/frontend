import {
  GET_GRAPH_DATA_FAILED,
  GET_GRAPH_DATA_SUCCESS,
  GETTING_GRAPH_DATA
} from "../actions/actionTypes";

const initialState = {
  graphData: [],
  retrievingGraphData: false,
  graphDataFetched: false,
  message: "Graph Data Information Not Available",
};

const getGraphDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GRAPH_DATA_SUCCESS:
      return {
        ...state,
        graphData: action.payload,
        retrievingGraphData: false,
        graphDataFetched: true,
        message: "Graph Data fetched",
      };

    case GETTING_GRAPH_DATA:
      return {
        ...state,
        retrievingGraphData: true,
      };

    case GET_GRAPH_DATA_FAILED:
      return {
        ...state,
        message: action.payload,
        graphDataFetched: false,
        retrievingGraphData: false,
      };

    default:
      return state;
  }
};
export default getGraphDataReducer;