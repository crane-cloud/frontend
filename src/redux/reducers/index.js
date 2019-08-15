import { combineReducers } from 'redux';
import loginSuccess from './auth/loginSuccess';
import fetchJobs from './monitoring/fetchJobs';
import fetchPods from './monitoring/fetchPods';
import fetchDeployments from './monitoring/fetchDeployments';
import fetchNodes from './monitoring/fetchNodes';
import fetchClusterInfo from './monitoring/fetchClusterInfo';
import fetchContainers from './monitoring/fetchContainers';
import fetchReplicaSets from './monitoring/fetchReplicaSets';
import fetchConfigMaps from './monitoring/fetchConfigMaps';

export default combineReducers({
    loginSuccess,
    jobs: fetchJobs,
    pods: fetchPods,
    deployments: fetchDeployments,
    nodes: fetchNodes,
    clusterInfo: fetchClusterInfo,
    containers: fetchContainers,
    replicaSets: fetchReplicaSets,
    configMaps: fetchConfigMaps
});