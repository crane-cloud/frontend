import {
  FETCH_CONTAINERS_RUNNING,
  FETCH_CONTAINERS_WAITING,
  FETCH_CONTAINERS_TERMINATED,
  FETCH_CONTAINER_RESTARTS,
  FETCH_CONTAINER_CPU_CORES,
  FETCH_CONTAINER_MEMORY_REQUESTS
} from '../../actions/actionTypes';

const initialState = {
  containersRunning: '',
  containersWaiting: '',
  containersTerminated: '',
  containerRestarts: '',
  containerCpuCores: 0,
  containerMemRequests: 0
};

const fetchContainers = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_CONTAINERS_RUNNING:
    return {
      ...state,
      containersRunning: action.payload
    };

  case FETCH_CONTAINERS_WAITING:
    return {
      ...state,
      containersWaiting: action.payload
    };

  case FETCH_CONTAINERS_TERMINATED:
    return {
      ...state,
      containersTerminated: action.payload
    };

  case FETCH_CONTAINER_RESTARTS:
    return {
      ...state,
      containerRestarts: action.payload
    };

  case FETCH_CONTAINER_CPU_CORES:
    return {
      ...state,
      containerCpuCores: action.payload
    };

  case FETCH_CONTAINER_MEMORY_REQUESTS:
    return {
      ...state,
      containerMemRequests: action.payload
    };

  default:
    return state;
  }
};

export default fetchContainers;
