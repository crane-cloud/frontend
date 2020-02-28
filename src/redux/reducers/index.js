import { combineReducers } from 'redux';
import user from './user';
import ClusterResourcesReducer from './ClusterResourcesReducer';
import ClustersReducer from './clustersReducer';
import PodsReducer from './podsReducer';


export default combineReducers({
  ClusterResourcesReducer,
  ClustersReducer,
  user,
  PodsReducer

});
