import {
    FETCH_CLUSTER_CPU_USAGE,
    FETCH_CLUSTER_MEMORY_USAGE,
    FETCH_CLUSTER_DISK_USAGE,
    FETCH_CLUSTER_PODS
} from '../../actions/actionTypes';


const initialState = {
    clusterCPU: 0,
    clusterMemory: 0,
    clusterDisk: 0,
    clusterPod: 0
}

const fetchClusterInfo = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CLUSTER_CPU_USAGE:
            return {
                ...state,
                clusterCPU: action.payload
            };

        case FETCH_CLUSTER_MEMORY_USAGE:
            return {
                ...state,
                clusterMemory: action.payload
            };

        case FETCH_CLUSTER_DISK_USAGE:
            return {
                ...state,
                clusterDisk: action.payload
            };

        case FETCH_CLUSTER_PODS:
            return {
                ...state,
                clusterPod: action.payload
            };

        default:
            return state;

    }
}

export default fetchClusterInfo;

