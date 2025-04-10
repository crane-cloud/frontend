import React from "react";
import { LoginPage } from "./pages/Auth/loginPage";
import ExperiementsDetailsPage from "./pages/Experirments/ExperiementsDetailsPage";
// import { HomePage } from "./pages/Home.page";
const AppsListPage = React.lazy(() => import("./pages/Apps/AppsListPage"));
const ProjectSettingsPage = React.lazy(
  () => import("./pages/Projects/ProjectSettingsPage")
);
const ProjectUsers = React.lazy(() => import("./pages/Projects/ProjectUsers"));
const ProjectMetrics = React.lazy(
  () => import("./pages/Projects/ProjectMetrics")
);
const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const CreateProjectForm = React.lazy(
  () => import("./components/Forms/CreateProjectForm")
);
const CreateAppForm = React.lazy(
  () => import("./components/Forms/CreateAppForm")
);
const AppDetailPage = React.lazy(() => import("./pages/Apps/AppDetailPage"));
const AppLogsPage = React.lazy(() => import("./pages/Apps/AppLogsPage"));
const DatabasePage = React.lazy(() => import("./pages/databases/DatabasePage"));
const DatabaseDetails = React.lazy(
  () => import("./pages/databases/DatabaseDetails")
);
const AppSettingsPage = React.lazy(
  () => import("./pages/Apps/AppSettingsPage")
);
const ExperiementsListPage = React.lazy(
  () => import("./pages/Experirments/ExperiementsListPage")
);
const ProjectDetailsPage = React.lazy(
  () => import("./pages/Projects/ProjectDetailsPage")
);
export const guestRoutes = [
  // { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
];
export const DashboardRoutes = [
  { path: "/", element: <LandingPage /> },
  // Projects
  { path: "/projects/create", element: <CreateProjectForm /> },
  { path: "/projects/:project_id", element: <ProjectDetailsPage /> },
  { path: "/projects/:project_id/apps", element: <AppsListPage /> },
  { path: "/projects/:project_id/settings", element: <ProjectSettingsPage /> },
  { path: "/projects/:project_id/users", element: <ProjectUsers /> },
  { path: "/projects/:project_id/metrics", element: <ProjectMetrics /> },
  // Applications
  { path: "/projects/:project_id/apps/create", element: <CreateAppForm /> },
  { path: "/projects/:project_id/apps/:app_id", element: <AppDetailPage /> },
  { path: "/projects/:project_id/apps/:app_id/logs", element: <AppLogsPage /> },
  {
    path: "/projects/:project_id/apps/:app_id/settings",
    element: <AppSettingsPage />,
  },
  // Databases
  { path: "/projects/:project_id/databases", element: <DatabasePage /> },
  {
    path: "/projects/:project_id/databases/:database_id",
    element: <DatabaseDetails />,
  },
  // Experiments
  {
    path: "/projects/:project_id/apps/:app_id/experiments",
    element: <ExperiementsListPage />,
  },
  {
    path: "/projects/:project_id/apps/:app_id/experiments/:experiment_id",
    element: <ExperiementsDetailsPage />,
  },
];
