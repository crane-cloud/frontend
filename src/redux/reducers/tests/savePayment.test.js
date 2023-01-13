import savePaymentReducer from "../savePayment";
import {
  SAVE_PAYMENT_SUCCESS,
  SAVE_PAYMENT_FAIL,
  START_SAVING_PAYMENT,
  CLEAR_SAVE_PAYMENT_STATE,
} from "../../actions/actionTypes";

const initialState = {
  payment: null,
  isSaved: false,
  isSaving: false,
  message: "",
};

const fetchAction = {
  type: SAVE_PAYMENT_SUCCESS,
  payment: undefined,
  isSaving: false,
  isSaved: true,
  message: "Success! Your payment has been saved.",
};

const fetchFailedAction = {
  type: SAVE_PAYMENT_FAIL,
  payment: null,
  isSaving: false,
  isSaved: false,
  message: "Payment failed. Please try again",
  error: undefined,
};

const startFetchingAction = {
  type: START_SAVING_PAYMENT,
};

const clearAction = {
  type: CLEAR_SAVE_PAYMENT_STATE,
};

describe("savePaymentReducer initial state", () => {
  it("should return the initial state", () => {
    expect(savePaymentReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(savePaymentReducer(initialState, fetchAction)).toEqual({
      payment: undefined,
      isSaving: false,
      isSaved: true,
      message: "Success! Your payment has been saved.",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(savePaymentReducer(initialState, fetchFailedAction)).toEqual({
      payment: null,
      isSaving: false,
      isSaved: false,
      message: "Payment failed. Please try again",
      error: undefined,
    });
  });

  it("should handle adding database", () => {
    expect(savePaymentReducer(initialState, startFetchingAction)).toEqual({
      payment: null,
      isSaved: false,
      isSaving: true,
      message: "",
    });
  });

  it("should handle clear adding database", () => {
    expect(savePaymentReducer(initialState, clearAction)).toEqual({
      payment: null,
      isSaved: false,
      isSaving: false,
      message: "",
    });
  });
});
