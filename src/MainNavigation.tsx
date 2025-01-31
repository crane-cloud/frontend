import React, { Suspense } from 'react'
import { useAuth } from './utils/AuthContext';
import { Loader } from '@mantine/core';
import { DashboardLayout } from './pages/Layouts/DashboardLayout';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { DashboardRoutes, guestRoutes } from './Router';

const MainNavigation = () => {
    const { loggedIn, user } = useAuth();
    if (loggedIn) {
        return (
            <DashboardLayout>
                <Suspense fallback={<Loader />}>
                    <Routes>
                        {DashboardRoutes.map((route) => (
                            <Route key={route.path} path={route.path} element={route.element} />
                        ))}
                    </Routes>
                </Suspense>
            </DashboardLayout>
        )
    }
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                {guestRoutes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Routes>
        </Suspense>
    )
}

export default MainNavigation