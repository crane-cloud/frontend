import {
  SAVE_PAYMENT_SUCCESS,
  SAVE_PAYMENT_FAIL,
  START_SAVING_PAYMENT,
  CLEAR_SAVE_PAYMENT_STATE,
} from "../actions/actionTypes";

const initialState = {
  payment: null,
  isSaved: false,
  isSaving: false,
  message: "",
};

const savePaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PAYMENT_SUCCESS:
      return {
        ...state,
        payment: action.payload,
        isSaving: false,
        isSaved: true,
        message: "Success! Your payment has been saved.",
      };

    case START_SAVING_PAYMENT:
      return {
        ...state,
        payment: null,
        isSaving: true,
        isSaved: false,
        message: "",
      };

    case SAVE_PAYMENT_FAIL:
      return {
        ...state,
        payment: null,
        isSaving: false,
        isSaved: false,
        message: "Payment failed. Please try again",
        error: action.payload.error,
      };

    case CLEAR_SAVE_PAYMENT_STATE:
      return {
        ...state,
        payment: null,
        isSaved: false,
        isSaving: false,
        message: "",
      };

    default:
      return state;
  }
};

export default savePaymentReducer;
