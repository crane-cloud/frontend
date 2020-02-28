import { combineReducers } from 'redux';
import user from './user';
import ClusterResourcesReducer from './ClusterResourcesReducer';
import ClustersReducer from './clustersReducer';
import NamespacesListReducer from './NamespacesListReducer';


export default combineReducers({
  ClusterResourcesReducer,
  ClustersReducer,
  user,
  NamespacesListReducer

});
