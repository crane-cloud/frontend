import { combineReducers } from 'redux';
import ClustersReducer from './clustersReducer';
import AddClusterReducer from './addClusterReducer';
import user from './user';
import ClusterResourcesReducer from './ClusterResourcesReducer';
import NamespacesListReducer from './NamespacesListReducer';


export default combineReducers({
  ClusterResourcesReducer,
  ClustersReducer,
  user,
  NamespacesListReducer,
  AddClusterReducer

});
