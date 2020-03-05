import { combineReducers } from 'redux';
import ClustersReducer from './clustersReducer';
import AddClusterReducer from './addClusterReducer';
import user from './user';
import ClusterResourcesReducer from './ClusterResourcesReducer';
<<<<<<< HEAD
import PvsReducer from './PvsReducer';
=======
import PvcsReducer from './pvcsReducer';
import NamespacesListReducer from './NamespacesListReducer';
import podsReducer from './podsReducer';
>>>>>>> 7c35abe4bdf73bf1e3bbc2f06507b96723b8f59b


export default combineReducers({
  ClusterResourcesReducer,
  ClustersReducer,
  user,
  AddClusterReducer,
  PvsReducer,
  PvcsReducer,
  NamespacesListReducer,
  podsReducer

});
