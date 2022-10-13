// login & logout
export const SAVE_USER = "SAVE_USER";
export const REMOVE_USER = "REMOVE_USER";
// USERS
export const GET_USER_DETAIL_SUCCESS = "GET_USER_DETAIL_SUCCESS";
export const GET_USER_DETAIL_FAIL = "GET_USER_DETAIL_FAIL";
export const START_GETTING_USER_DETAIL = "START_GETTING_USER_DETAIL";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAIL = "GET_USERS_FAIL";
export const START_GETTING_USERS = "START_GETTING_USERS";
// RESOURCE COUNT
export const GET_RESOURCES_COUNT = "GET_RESOURCES_COUNT";
export const GET_RESOURCES_COUNT_FAILED = "GET_RESOURCES_COUNT_FAILED";
export const START_GETTING_RESOURCES_COUNT = "START_GETTING_RESOURCES_COUNT";
// CLUSTERS
export const GET_CLUSTERS = "GET_CLUSTERS";
export const GET_CLUSTERS_FAIL = "GET_CLUSTERS_FAIL";
export const START_GETTING_CLUSTERS = "START_GETTING_CLUSTERS";
// CLUSTERS UPDATE
export const START_UPDATING_CLUSTER = "START_UPDATING_CLUSTER";
export const CLEAR_CLUSTER_UPDATE_STATE = "CLEAR_CLUSTER_UPDATE_STATE";
export const UPDATE_CLUSTER_SUCCESS = "UPDATE_CLUSTER_SUCCESS";
export const UPDATE_CLUSTER_FAILED = "UPDATE_CLUSTER_FAILED";

// NAMESPACES
export const IS_FETCHING = "IS_FETCHING";
export const FETCH_NAMESPACES_SUCCESS = "FETCH_NAMESPACES_SUCCESS";
export const FETCH_NAMESPACES_FAILED = "FETCH_NAMESPACES_FAILED";
// PODS
export const GET_PODS_SUCCESS = "GET_PODS_SUCCESS";
export const GET_PODS_FAIL = "GET_PODS_FAIL";
export const START_GETTING_PODS = "START_GETTING_PODS";
// STORAGECLASSES
export const GET_STORAGE_CLASS_SUCCESS = "GET_STORAGE_CLASS_SUCCESS";
export const GET_STORAGE_CLASS_FAIL = "GET_STORAGE_CLASS_FAIL";
export const START_GETTING_STORAGE_CLASS = "START_GETTING_STORAGE_CLASS";
// CREATE CLUSTER
export const ADD_CLUSTER_SUCCESS = "ADD_CLUSTER";
export const ADD_CLUSTERS_FAIL = "ADD_CLUSTERS_FAIL";
export const START_ADDING_CLUSTER = "START_ADDING_CLUSTERS";
export const CLEAR_ADD_CLUSTER_STATE = "CLEAR_ADD_CLUSTER_STATE";
// SERVICES
export const FETCH_SERVICES_SUCCESS = "FETCH_SERVICES_SUCCESS";
export const FETCH_SERVICES_FAILED = "FETCH_SERVICES_FAILED";
// VOLUMES
export const FETCH_PVS_SUCCESS = "FETCH_PVS_SUCCESS";
export const FETCH_PVS_FAILED = "FETCH_PVS_FAILED";
// NODES
export const GET_NODES_SUCCESS = "GET_NODES_SUCCESS";
export const GET_NODES_FAIL = "GET_NODES_FAIL";
export const START_GETTING_NODES = "START_GETTING_NODES";
// PVC
export const FETCH_PVCS_SUCCESS = "FETCH_PVCS_SUCCESS";
export const FETCH_PVCS_FAILED = "FETCH_PVCS_FAILED";
// JOBS
export const FETCH_JOBS_SUCCESS = "FETCH_JOBS_SUCCESS";
export const FETCH_JOBS_FAILED = "FETCH_JOBS_FAILED";
// DEPLOYMENTS
export const GETTING_DEPLOYMENTS = "GETTING_DEPLOYMENTS";
export const GET_DEPLOYMENTS_SUCCESS = "GET_DEPLOYMENTS_SUCCESS";
export const GET_DEPLOYMENTS_FAIL = "GET_DEPLOYMENTS_FAIL";
// PROJECTS
export const FETCH_USER_PROJECTS_SUCCESS = "FETCH_USER_PROJECTS_SUCCESS";
export const FETCH_USER_PROJECTS_FAILED = "FETCH_USER_PROJECTS_FAILED";
export const START_ADDING_PROJECT = "START_ADDING_PROJECT";
export const ADD_PROJECT_SUCCESS = "ADD_PROJECT_SUCCESS";
export const ADD_PROJECT_FAILED = "ADD_PROJECT_FAILED";
export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS";
export const DELETE_PROJECT_FAIL = "DELETE_PROJECT_FAIL";
export const START_DELETING_PROJECT = "START_DELETING_PROJECT";
export const CLEAR_ADD_PROJECT_STATE = "CLEAR_ADD_PROJECT_STATE";
export const CLEAR_DELETE_PROJECT_STATE = "CLEAR_DELETE_PROJECT_STATE";
export const START_UPDATING_PROJECT = "START_UPDATING_PROJECT";
export const CLEAR_UPDATE_PROJECT_STATE = "CLEAR_UPDATE_PROJECT_STATE";
export const UPDATE_PROJECT_SUCCESS = "UPDATE_PROJECT_SUCCESS";
export const UPDATE_PROJECT_FAILED = "UPDATE_PROJECT_FAILED";

// ADMIN PROJECTS
export const FETCH_ADMIN_PROJECTS_SUCCESS = "FETCH_ADMIN_PROJECTS_SUCCESS";
export const FETCH_ADMIN_PROJECTS_FAILED = "FETCH_ADMIN_PROJECTS_FAILED";
// APPS LIST
export const GET_APPS_SUCCESS = "GET_APPS_SUCCESS";
export const GET_APPS_FAIL = "GET_APPS_FAIL";
export const START_GETTING_APPS = "START_GETTING_APPS";
// CREATE APP
export const CREATE_APP_SUCCESS = "CREATE_APP_SUCCESS";
export const CREATE_APP_FAIL = "CREATE_APP_FAIL";
export const START_CREATING_APP = "START_CREATING_APP";
export const CLEAR_ADD_APP_STATE = "CLEAR_ADD_APP_STATE";
// Get single app
export const SINGLE_APP_SUCCESS = "SINGLE_APP_SUCCESS";
export const SINGLE_APP_FAIL = "SINGLE_APP_FAIL";
export const GETTING_SINGLE_APP = "GETTING_SINGLE_APP";
export const CLEAR_FETCH_APP = "CLEAR_FETCH_APP";
// UPDATE APP
export const UPDATE_APP_SUCCESS = "UPDATE_APP_SUCCESS";
export const UPDATE_APP_FAIL = "UPDATE_APP_FAIL";
export const START_UPDATING_APP = "START_UPDATING_APP";
export const CLEAR_UPDATE_APP_STATE = "CLEAR_UPDATE_APP_STATE";
// DELETE APP
export const DELETE_APP_SUCCESS = "DELETE_APP_SUCCESS";
export const DELETE_APP_FAIL = "DELETE_APP_FAIL";
export const START_DELETING_APP = "START_DELETING_APP";
export const CLEAR_DELETE_APP_STATE = "CLEAR_DELETE_APP_STATE";
// PROJECT MEMORY
export const FETCH_PROJECT_MEMORY_SUCCESS = "FETCH_PROJECT_MEMORY_SUCCESS";
export const FETCH_PROJECT_MEMORY_FAILED = "FETCH_PROJECT_MEMORY_FAILED";
export const IS_FETCHING_PROJECT_MEMORY = "IS_FETCHING_PROJECT_MEMORY";
export const CLEAR_PROJECT_MEMORY = "CLEAR_PROJECT_MEMORY";
// PROJECT CPU
export const FETCH_PROJECT_CPU_SUCCESS = "FETCH_PROJECT_CPU_SUCCESS";
export const FETCH_PROJECT_CPU_FAILED = "FETCH_PROJECT_CPU_FAILED";
export const IS_FETCHING_PROJECT_CPU = "IS_FETCHING_PROJECT_CPU";
export const CLEAR_PROJECT_CPU = "CLEAR_PROJECT_CPU";
// PROJECT NETWORK
export const FETCH_PROJECT_NETWORK_SUCCESS = "FETCH_PROJECT_NETWORK_SUCCESS";
export const FETCH_PROJECT_NETWORK_FAILED = "FETCH_PROJECT_NETWORK_FAILED";
export const IS_FETCHING_PROJECT_NETWORK = "IS_FETCHING_PROJECT_NETWORK";
export const CLEAR_PROJECT_NETWORK = "CLEAR_PROJECT_NETWORK";
// PROJECT DATABASES
export const FETCH_PROJECT_DATABASES_SUCCESS =
  "FETCH_PROJECT_DATABASES_SUCCESS";
export const FETCH_PROJECT_DATABASES_FAILED = "FETCH_PROJECT_DATABASES_FAILED";
export const IS_FETCHING_PROJECT_DATABASES = "IS_FETCHING_PROJECT_DATABASES";
export const CLEAR_PROJECT_DATABASES = "CLEAR_PROJECT_DATABASES";
// APP NETWORK
export const FETCH_APP_NETWORK_SUCCESS = "FETCH_APP_NETWORK_SUCCESS";
export const FETCH_APP_NETWORK_FAILED = "FETCH_APP_NETWORK_FAILED";
export const IS_FETCHING_APP_NETWORK = "IS_FETCHING_APP_NETWORK";
export const CLEAR_APP_NETWORK = "CLEAR_APP_NETWORK";
// APP CPU
export const FETCH_APP_CPU_SUCCESS = "FETCH_APP_CPU_SUCCESS";
export const FETCH_APP_CPU_FAILED = "FETCH_APP_CPU_FAILED";
export const IS_FETCHING_APP_CPU = "IS_FETCHING_APP_CPU";
export const CLEAR_APP_CPU = "CLEAR_APP_CPU";
// APP MEMORY
export const FETCH_APP_MEMORY_SUCCESS = "FETCH_APP_MEMORY_SUCCESS";
export const FETCH_APP_MEMORY_FAILED = "FETCH_APP_MEMORY_FAILED";
export const IS_FETCHING_APP_MEMORY = "IS_FETCHING_APP_MEMORY";
export const CLEAR_APP_MEMORY = "CLEAR_APP_MEMORY";
// APP LOGS
export const GET_APP_LOGS_SUCCESS = "GET_APP_LOGS_SUCCESS";
export const GET_APPS_LOGS_FAIL = "GET_APPS_LOGS_FAIL";
export const START_GETTING_APP_LOGS = "START_GETTING_APP_LOGS";
// RESET DATABASE
export const RESET_DATABASE_SUCCESS = "RESET_DATABASE_SUCCESS";
export const RESET_DATABASE_FAIL = "RESET_DATABASE_FAIL";
export const START_RESETING_DATABASE = "START_RESETING_DATABASE";
export const CLEAR_RESET_DATABASE_STATE = "CLEAR_RESET_DATABASE_STATE";
// DELETE DATABASE
export const DELETE_DATABASE_SUCCESS = "DELETE_DATABASE_SUCCESS";
export const DELETE_DATABASE_FAIL = "DELETE_DATABASE_FAIL";
export const START_DELETING_DATABASE = "START_DELETING_DATABASE";
export const CLEAR_DELETE_DATABASE_STATE = "CLEAR_DELETE_DATABASE_STATE";
export const START_UPDATING_DATABASE_PASSWORD =
  "START_UPDATING_DATABASE_PASSWORD";
export const CLEAR_UPDATE_DATABASE_PASSWORD_STATE =
  "CLEAR_DATABASE_PASSWORD_STATE";
export const UPDATE_DATABASE_PASSWORD_SUCCESS =
  "UPDATE_DATABASE_PASSWORD_SUCCESS";
export const UPDATE_DATABASE_PASSWORD_FAILED =
  "UPDATE_DATABASE_PASSWORD_FAILED";
// CREATE DATABASE
export const CREATE_DATABASE_SUCCESS = "CREATE_DATABASE_SUCCESS";
export const CREATE_DATABASE_FAIL = "CREATE_DATABASE_FAIL";
export const START_CREATING_DATABASE = "START_CREATING_DATABASE";
export const CLEAR_ADD_DATABASE_STATE = "CLEAR_ADD_DATABASE_STATE";
// CREATE ADMIN DATABASE
export const ADMIN_CREATE_DATABASE_SUCCESS = "ADMIN_CREATE_DATABASE_SUCCESS";
export const ADMIN_CREATE_DATABASE_FAIL = "ADMIN_CREATE_DATABASE_FAIL";
export const ADMIN_START_CREATING_DATABASE = "ADMIN_START_CREATING_DATABASE";
export const ADMIN_CLEAR_ADD_DATABASE_STATE = "ADMIN_CLEAR_ADD_DATABASE_STATE";
//Get single Database
export const GETTING_SINGLE_DATABASE = "GETTING_SINGLE_DATABASE";
export const SINGLE_DATABASE_FAIL = "SINGLE_DATABASE_FAIL";
export const SINGLE_DATABASE_SUCCESS = "SINGLE_DATABASE_SUCCESS";
// Get password
export const GETTING_PASSWORD = "GETTING_PASSWORD";
export const PASSWORD_FAIL = "PASSWORD_FAIL";
export const PASSWORD_SUCCESS = "PASSWORD_SUCCESS";
export const CLEAR_FETCH_PASSWORD = "CLEAR_FETCH_PASSWORD";
// Admin Get databases stats
export const GETTING_ALL_DATABASES = "GETTING_ALL_DATABASES";
export const ALL_DATABASES_FAIL = "ALL_DATABASES_FAIL";
export const ALL_DATABASES_SUCCESS = "ALL_DATABASES_SUCCESS";
// Admin get all databases
export const ADMIN_GETTING_ALL_DATABASES = "ADMIN_GETTING_ALL_DATABASES";
export const ADMIN_ALL_DATABASES_FAIL = "ADMIN_ALL_DATABASES_FAIL";
export const ADMIN_ALL_DATABASES_SUCCESS = "ADMIN_ALL_DATABASES_SUCCESS";
//users summary
export const GETTING_USERS_SUMMARY = "GETTING_USERS_SUMMARY";
export const USERS_SUMMARY_FAIL = "USERS_SUMMARY_FAIL";
export const USERS_SUMMARY_SUCCESS = "USERS_SUMMARY_SUCCESS";
// apps summary
export const GETTING_APPS_SUMMARY = "GETTING_APPS_SUMMARY";
export const APPS_SUMMARY_FAIL = "APPS_SUMMARY_FAIL";
export const APPS_SUMMARY_SUCCESS = "APPS_SUMMARY_SUCCESS";
// revert app url
export const REVERTING_URL = "REVERTING_URL";
export const REVERT_SUCCESS = "REVERT_SUCCESS";
export const REVERT_FAIL = "REVERT_FAIL";
export const CLEAR_REVERT_STATE = "CLEAR_REVERT_STATE";
// get project billing info
export const GETTING_PROJECT_BILLING_INFO = "GETTING_PROJECT_BILLING_INFO";
export const PROJECT_BILLING_INFO_FAIL = "PROJECT_BILLING_INFO_FAIL";
export const PROJECT_BILLING_INFO_SUCCESS = "PROJECT_BILLING_INFO_SUCCESS";
// save payment
export const SAVE_PAYMENT_SUCCESS = "SAVE_PAYMENT_SUCCESS";
export const SAVE_PAYMENT_FAIL = "SAVE_PAYMENT_FAIL";
export const START_SAVING_PAYMENT = "START_SAVING_PAYMENT";
export const CLEAR_SAVE_PAYMENT_STATE = "CLEAR_SAVE_PAYMENT_STATE";
// get transactions
export const GETTING_TRANSACTIONS = "GETTING_TRANSACTIONS";
export const TRANSACTIONS_FAIL = "TRANSACTIONS_FAIL";
export const TRANSACTIONS_SUCCESS = "TRANSACTIONS_SUCCESS";
export const CLEAR_TRANSACTIONS = "CLEAR_TRANSACTIONS";
// add beta user
export const ADDING_BETA_USER = "ADDING_BETA_USER";
export const ADD_BETA_USER_SUCCESS = "ADD_BETA_USER_SUCCESS";
export const ADD_BETA_USER_FAIL = "ADD_BETA_USER_FAIL";
// get all invoices
export const GETTING_INVOICES = "GETTING_INVOICES";
export const INVOICES_FAIL = "INVOICES_FAIL";
export const INVOICES_SUCCESS = "INVOICES_SUCCESS";
export const CLEAR_INVOICES = "CLEAR_INVOICES";
// get all RECEIPTS
export const GETTING_RECEIPTS = "GETTING_RECEIPTS";
export const RECEIPTS_FAIL = "RECEIPTS_FAIL";
export const RECEIPTS_SUCCESS = "RECEIPTS_SUCCESS";
export const CLEAR_RECEIPTS = "CLEAR_RECEIPTS";
//add credit
export const ADDING_USER_CREDITS = "ADDING_USER_CREDITS";
export const ADD_BETA_USER_CREDITS_SUCCESS = "ADD_BETA_USER_CREDITS_SUCCESS";
export const ADD_BETA_USER_CREDITS_FAIL = "ADD_BETA_USER_CREDITS_FAIL";
export const CLEAR_ADD_BETA_USER_CREDITS_STATE =
  "CLEAR_ADD_BETA_USER_CREDITS_STATE";
// get user credits
export const GETTING_USER_CREDITS = "GETTING_USER_CREDITS";
export const GET_USER_CREDITS_FAIL = "GET_USER_CREDITS_FAIL";
export const GET_USER_CREDITS_SUCCESS = "GET_USER_CREDITS_SUCCESS";
// admin get user credits
export const ADMIN_GETTING_USER_CREDITS = "ADMIN_GETTING_USER_CREDITS";
export const ADMIN_GET_USER_CREDITS_FAIL = "ADMIN_GET_USER_CREDITS_FAIL";
export const ADMIN_GET_USER_CREDITS_SUCCESS = "ADMIN_GET_USER_CREDITS_SUCCESS";
export const ADMIN_CLEAR_USER_CREDITS = "ADMIN_CLEAR_USER_CREDITS";
//Update User
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAIL = "UPDATE_PROFILE_FAIL";
export const START_UPDATING_PROFILE = "START_UPDATING_PROFILE";
export const CLEAR_UPDATE_PROFILE_STATE = "CLEAR_UPDATE_PROFILE_STATE";
// credits payments
export const CREDITS_PAYMENT_SUCCESS = "CREDITS_PAYMENT_SUCCESS";
export const CREDITS_PAYMENT_FAIL = "CREDITS_PAYMENT_FAIL";
export const START_CREDITS_PAYMENT = "START_CREDITS_PAYMENT";
export const CLEAR_CREDITS_PAYMENT_STATE = "CLEAR_CREDITS_PAYMENT_STATE";

export const GET_GRAPH_DATA_SUCCESS = "GET_GRAPH_DATA_SUCCESS";
export const GET_GRAPH_DATA_FAILED = "GET_GRAPH_DATA_FAILED";
export const GETTING_GRAPH_DATA = "GETTING_GRAPH_DATA";

//get project members
export const GET_PROJECT_MEMBERS_SUCCESS = "GET_PROJECT_MEMBERS_SUCCESS";
export const GET_PROJECT_MEMBERS_FAILED = "GET_PROJECT_MEMBERS_FAILED";
export const START_GETTING_PROJECT_MEMBERS = "START_GETTING_PROJECT_MEMBERS";
export const CLEAR_GET_PROJECT_MEMBERS_STATE =
  "CLEAR_GET_PROJECT_MEMBERS_STATE";

//invite project members
export const INVITE_MEMBERS_SUCCESS = "INVITE_MEMBERS_SUCCESS";
export const INVITE_MEMBERS_FAILED = "INVITE_MEMBERS_FAILED";
export const START_INVITING_MEMBERS = "START_INVITING_MEMBERS";
