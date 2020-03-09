import { combineReducers } from 'redux';
import ClustersReducer from './clustersReducer';
import AddClusterReducer from './addClusterReducer';
import user from './user';
import ClusterResourcesReducer from './ClusterResourcesReducer';
import nodesReducer from './nodesReducer';
import PvcsReducer from './pvcsReducer';
import NamespacesListReducer from './NamespacesListReducer';
import podsReducer from './podsReducer';
import JobsReducer from './jobsReducer';
import getDeployments from './getDeployments';


export default combineReducers({
  ClusterResourcesReducer,
  ClustersReducer,
  user,
  AddClusterReducer,
  nodesReducer,
  PvcsReducer,
  NamespacesListReducer,
  podsReducer,
  JobsReducer,

  deployments: getDeployments
});
