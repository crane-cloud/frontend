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
import AdminProjectsReducer from './AdminProjectsReducer';
import AppsListReducer from './appsListReducer';
import UserProjectsReducer from './userProjectsReducer';
import addProjectReducer from './addProjectReducer';
import createAppReducer from './createApp';
import deleteAppReducer from './DeleteAppReducer';
import deleteProjectReducer from './deleteProjectReducer';
import UserDetailReducer from './userDetailReducer';
import UsersListReducer from './usersListReducer';


export default combineReducers({
  ClusterResourcesReducer,
  ClustersReducer,
  user,
  AddClusterReducer,
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
  addProjectReducer,
  createNewApp: createAppReducer,
  deleteAppReducer,
  deleteProjectReducer,
  UserDetailReducer,
  UsersListReducer,
});
