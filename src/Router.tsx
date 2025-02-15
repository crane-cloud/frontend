import React from "react";
import { HomePage } from "./pages/Home.page";
import { LoginPage } from "./pages/Auth/loginPage";
import AppsListPage from "./pages/Apps/AppsListPage";
import ProjectSettingsPage from "./pages/Projects/ProjectSettingsPage";
import ProjectUsers from "./pages/Projects/ProjectUsers";
import ProjectMetrics from "./pages/Projects/ProjectMetrics";
import LandingPage from "./pages/LandingPage";
import CreateProjectForm from "./components/Forms/CreateProjectForm";
import CreateAppForm from "./components/Forms/CreateAppForm";
import AppDetailPage from "./pages/Apps/AppDetailPage";
const ProjectDetailsPage = React.lazy(
  () => import("./pages/Projects/ProjectDetailsPage")
);
export const guestRoutes = [
  { path: "/", element: <HomePage /> },
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
];
