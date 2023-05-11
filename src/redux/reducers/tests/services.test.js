import servicesReducer from "../services";
import {
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_FAILED,
  IS_FETCHING,
} from "../../actions/actionTypes";

const initialState = {
  services: [],
  pagination:{},
  isFetched: false,
  isRetrieving: false,
  message: "Cluster Services Not Available",
};

const fetchAction = {
  type: FETCH_SERVICES_SUCCESS,
  payload: {
    services: [],
    pagination:{},
  }
};

const fetchFailedAction = {
  type: FETCH_SERVICES_FAILED,
  message: undefined,
  isReverted: false,
  isReverting: false,
};

const startFetchingAction = {
  type: IS_FETCHING,
};
describe("servicesReducer initial state", () => {
  it("should return the initial state", () => {
    expect(servicesReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(servicesReducer(initialState, fetchAction)).toEqual({
      services: [],
      isRetrieving: false,
      pagination:{},
      isFetched: true,
      message: "All Cluster Services fetched",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(servicesReducer(initialState, fetchFailedAction)).toEqual({
      isFetched: false,
      message: undefined,
      isRetrieving: false,
      pagination:{},
      services: []
    });
  });

  it("should handle adding database", () => {
    expect(servicesReducer(initialState, startFetchingAction)).toEqual({
      services: [],
      isFetched: false,
      pagination:{},
      isRetrieving: true,
      message: "Cluster Services Not Available",
    });
  });
});
