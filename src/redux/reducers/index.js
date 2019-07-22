import { combineReducers } from 'redux';
import loginSuccess from './auth/loginSuccess';
import fetchJobs from './monitoring/fetchJobs';
import fetchPods from './monitoring/fetchPods';
import fetchDeployments from './monitoring/fetchDeployments';

export default combineReducers({
    loginSuccess,
    jobs: fetchJobs,
    pods: fetchPods,
    deployments: fetchDeployments
});