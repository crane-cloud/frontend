import { combineReducers } from 'redux';
import clustersReducer from './clusters';
import addClusterReducer from './addCluster';
import user from './user';
import clusterResourcesReducer from './clusterResources';
import servicesReducer from './services';
import pvsReducer from './pvs';
import nodesReducer from './nodes';
import pvcsReducer from './pvcs';
import namespacesListReducer from './namespacesList';
import podsReducer from './pods';
import storageClassesReducer from './storageClass';
import jobsReducer from './jobs';
import getDeployments from './getDeployments';
import adminProjectsReducer from './adminProjects';
import appsListReducer from './appsList';
import userProjectsReducer from './userProjects';
import addProjectReducer from './addProject';
import createAppReducer from './createApp';
import deleteProjectReducer from './deleteProject';
import deleteAppReducer from './deleteApp';
import userDetailReducer from './userDetails';
import usersListReducer from './usersList';
import updateProjectReducer from './updateProject';
import projectMemoryReducer from './projectMemory';
import projectCPUReducer from './projectCPU';
import projectNetworkReducer from './projectNetwork';
import appNetworkReducer from './appNetwork';
import appCpuReducer from './appCpu';
import appMemoryReducer from './appMemoryReducer';
import appLogsReducer from './getAppLogs';
import projectDatabasesReducer from './databaseList';
import deleteDatabaseReducer from './deleteDatabase';
import resetDatabaseReducer from './resetDatabase';


export default combineReducers({
  clusterResourcesReducer,
  clustersReducer,
  user,
  addClusterReducer,
  servicesReducer,
  storageClassesReducer,
  pvsReducer,
  nodesReducer,
  pvcsReducer,
  namespacesListReducer,
  podsReducer,
  deployments: getDeployments,
  jobsReducer,
  adminProjectsReducer,
  appsListReducer,
  userProjectsReducer,
  addProjectReducer,
  createNewApp: createAppReducer,
  deleteAppReducer,
  deleteProjectReducer,
  userDetailReducer,
  usersListReducer,
  updateProjectReducer,
  projectMemoryReducer,
  projectCPUReducer,
  projectNetworkReducer,
  appLogsReducer,
  appNetworkReducer,
  appCpuReducer,
  appMemoryReducer,
  projectDatabasesReducer,
  deleteDatabaseReducer,
  resetDatabaseReducer
});
