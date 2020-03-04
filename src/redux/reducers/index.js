import { combineReducers } from 'redux';
import ClustersReducer from './clustersReducer';
import AddClusterReducer from './addClusterReducer';
import user from './user';
import ClusterResourcesReducer from './ClusterResourcesReducer';
import NamespacesListReducer from './NamespacesListReducer';
import podsReducer from './podsReducer';


export default combineReducers({
  ClusterResourcesReducer,
  ClustersReducer,
  user,
  NamespacesListReducer,
  podsReducer,
  AddClusterReducer

});
