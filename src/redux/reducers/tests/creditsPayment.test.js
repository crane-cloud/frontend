import creditsPaymentReducer from "../creditsPayments";
import {
  CREDITS_PAYMENT_SUCCESS,
  CREDITS_PAYMENT_FAIL,
  START_CREDITS_PAYMENT,
  CLEAR_CREDITS_PAYMENT_STATE,
} from "../../actions/actionTypes";

const initialState = {
  payment: null,
  creditsSaved: false,
  creditsSaving: false,
  creditsSavingFailed: false,
  message: "",
};

const fetchAction = {
  type: CREDITS_PAYMENT_SUCCESS,
  payment: undefined,
  creditsSaving: false,
  creditsSaved: true,
  creditsSavingFailed: false,
  message: "Success! Your payment has been saved.",
};

const fetchFailedAction = {
  type: CREDITS_PAYMENT_FAIL,
  payment: null,
  creditsSaving: false,
  creditsSaved: false,
  creditsSavingFailed: true,
  message: "Payment failed. Please try again",
  error: undefined,
};

const startFetchingAction = {
  type: START_CREDITS_PAYMENT,
};

const clearAction = {
  type: CLEAR_CREDITS_PAYMENT_STATE,
};

describe("creditsPaymentReducer initial state", () => {
  it("should return the initial state", () => {
    expect(creditsPaymentReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle database added", () => {
    expect(creditsPaymentReducer(initialState, fetchAction)).toEqual({
      payment: undefined,
      creditsSaving: false,
      creditsSaved: true,
      creditsSavingFailed: false,
      message: "Success! Your payment has been saved.",
    });
  });

  it("should handle FETCH_FAILED", () => {
    expect(creditsPaymentReducer(initialState, fetchFailedAction)).toEqual({
      payment: null,
      creditsSaving: false,
      creditsSaved: false,
      creditsSavingFailed: true,
      message: "Payment failed. Please try again",
      error: undefined,
    });
  });

  it("should handle adding database", () => {
    expect(creditsPaymentReducer(initialState, startFetchingAction)).toEqual({
      payment: null,
      creditsSaved: false,
      creditsSaving: true,
      creditsSavingFailed: false,
      message: "",
    });
  });

  it("should handle clear adding database", () => {
    expect(creditsPaymentReducer(initialState, clearAction)).toEqual({
      payment: null,
      creditsSaved: false,
      creditsSaving: false,
      creditsSavingFailed: false,
      message: "",
    });
  });
});
