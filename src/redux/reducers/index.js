import { combineReducers } from 'redux';
import loginSuccess from './auth/loginSuccess';
import jobsReducer from './monitoring/jobs';


export default combineReducers({
    loginSuccess,
    jobs: jobsReducer
});