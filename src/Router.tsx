import React from "react";
import { HomePage } from './pages/Home.page';
import { LoginPage } from './pages/Auth/loginPage';
const ProjectsPage = React.lazy(() => import('./pages/Layouts/ProjectsPage'));

export const guestRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
];
export const DashboardRoutes = [
  { path: '/', element: <ProjectsPage />, },
];


