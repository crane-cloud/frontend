import { HomePage } from './pages/Home.page';
import { LoginPage } from './pages/Auth/loginPage';
import ProjectsPage from './pages/Layouts/ProjectsPage';

export const guestRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
];
export const DashboardRoutes = [
  {
    path: '/',
    element: <ProjectsPage />,
  },
];


