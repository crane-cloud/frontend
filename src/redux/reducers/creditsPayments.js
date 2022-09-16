import {
    CREDITS_PAYMENT_SUCCESS,
    CREDITS_PAYMENT_FAIL,
    START_CREDITS_PAYMENT,
    CLEAR_CREDITS_PAYMENT_STATE,
  } from "../actions/actionTypes";
  
  const initialState = {
    payment: null,
    creditsSaved: false,
    creditsSaving: false,
    creditsSavingFailed: false,
    message: "",
  };
  
  const creditsPaymentReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREDITS_PAYMENT_SUCCESS:
        return {
          ...state,
          payment: action.payload,
          creditsSaving: false,
          creditsSaved: true,
          creditsSavingFailed: false,
          message: "Success! Your payment has been saved.",
        };
  
      case START_CREDITS_PAYMENT:
        return {
          ...state,
          payment: null,
          creditsSaving: true,
          creditsSaved: false,
          creditsSavingFailed: false,
          message: "",
        };
  
      case CREDITS_PAYMENT_FAIL:
        return {
          ...state,
          payment: null,
          creditsSaving: false,
          creditsSaved: false,
          creditsSavingFailed: true,
          message: "Payment failed. Please try again",
          error: action.payload?.error
        };
  
      case CLEAR_CREDITS_PAYMENT_STATE:
        return {
          ...state,
          payment: null,
          creditsSaved: false,
          creditsSaving: false,
          creditsSavingFailed: false,
          message: "",
        };
  
      default:
        return state;
    }
  };
  
  export default creditsPaymentReducer;
  