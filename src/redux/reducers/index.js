import { combineReducers } from 'redux';
import loginSuccess from './loginSuccess';
import jobsReducer from './jobsReducer';


export default combineReducers({
    loginSuccess,
    jobs: jobsReducer
});