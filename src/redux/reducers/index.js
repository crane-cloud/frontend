import { combineReducers } from 'redux';
import ClustersReducer from './clustersReducer';
import AddClusterReducer from './addClusterReducer';
import user from './user';
import ClusterResourcesReducer from './ClusterResourcesReducer';
import ServicesReducer from './servicesReducer';
import nodesReducer from './nodesReducer';
import PvcsReducer from './pvcsReducer';
import NamespacesListReducer from './NamespacesListReducer';
import podsReducer from './podsReducer';
import getDeployments from './getDeployments';


export default combineReducers({
  ClusterResourcesReducer,
  ClustersReducer,
  user,
  AddClusterReducer,
  ServicesReducer,
  nodesReducer,
  PvcsReducer,
  NamespacesListReducer,
  podsReducer,
  deployments: getDeployments
});
