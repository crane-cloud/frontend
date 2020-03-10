import { combineReducers } from 'redux';
import ClustersReducer from './clustersReducer';
import AddClusterReducer from './addClusterReducer';
import user from './user';
import ClusterResourcesReducer from './ClusterResourcesReducer';
import ServicesReducer from './servicesReducer';
import PvsReducer from './PvsReducer';
import nodesReducer from './nodesReducer';
import PvcsReducer from './pvcsReducer';
import NamespacesListReducer from './NamespacesListReducer';
import podsReducer from './podsReducer';
import storageClassesReducer from './storageClassReducer';
import JobsReducer from './jobsReducer';
import getDeployments from './getDeployments';
import getUserProjects from './userProjectsReducer';


export default combineReducers({
  ClusterResourcesReducer,
  ClustersReducer,
  user,
  AddClusterReducer,
  ServicesReducer,
  PvsReducer,
  nodesReducer,
  PvcsReducer,
  NamespacesListReducer,
  podsReducer,
  storageClassesReducer,
  deployments: getDeployments,
  JobsReducer,
  getUserProjects,
});
