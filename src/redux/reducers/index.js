import { combineReducers } from 'redux';
import ClustersReducer from './clusters';
import addCluster from './addCluster';
import user from './user';
import ClusterResourcesReducer from './clusterResources';
import ServicesReducer from './services';
import PvsReducer from './pvs';
import nodesReducer from './nodes';
import PvcsReducer from './pvcs';
import NamespacesListReducer from './namespacesList';
import podsReducer from './pods';
import storageClassesReducer from './storageClass';
import JobsReducer from './jobs';
import getDeployments from './getDeployments';
import AdminProjectsReducer from './adminProjects';
import AppsListReducer from './appsList';
import UserProjectsReducer from './userProjects';
import addProject from './addProject';
import createAppReducer from './createApp';
import deleteAppReducer from './deleteApp';
import UserDetailReducer from './userDetails';
import UsersListReducer from './usersList';


export default combineReducers({
  ClusterResourcesReducer,
  ClustersReducer,
  user,
  addCluster,
  ServicesReducer,
  storageClassesReducer,
  PvsReducer,
  nodesReducer,
  PvcsReducer,
  NamespacesListReducer,
  podsReducer,
  deployments: getDeployments,
  JobsReducer,
  AdminProjectsReducer,
  AppsListReducer,
  UserProjectsReducer,
  addProject,
  createNewApp: createAppReducer,
  deleteAppReducer,
  UserDetailReducer,
  UsersListReducer,
});
