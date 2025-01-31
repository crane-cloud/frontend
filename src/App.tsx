import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from './theme';
import { AuthProvider } from './utils/AuthContext';
import MainNavigation from './MainNavigation';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <BrowserRouter>
        <AuthProvider>
          <MainNavigation />
        </AuthProvider>
      </BrowserRouter>
    </MantineProvider>
  );
}
