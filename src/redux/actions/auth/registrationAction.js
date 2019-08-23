import store from '../../../store';
import * as ACTIONTYPES from '../actionTypes'

const registrationFailure = ({message}) => {
    store.dispatch({
      type: ACTIONTYPES.REGISTRATION_FAILURE,
      registrationFailureMessage: message
    });
};

export default registrationFailure;