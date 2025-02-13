import React from "react";
import { HomePage } from "./pages/Home.page";
import { LoginPage } from "./pages/Auth/loginPage";
import AppsListPage from "./pages/Apps/AppsListPage";
const ProjectsPage = React.lazy(() => import("./pages/Projects/ProjectsPage"));
const ProjectDetailsPage = React.lazy(
  () => import("./pages/Projects/ProjectDetailsPage")
);
export const guestRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
];
export const DashboardRoutes = [
  { path: "/", element: <ProjectsPage /> },
  { path: "/projects/:project_id", element: <ProjectDetailsPage /> },
  { path: "/projects/:project_id/applications", element: <AppsListPage /> },
];
