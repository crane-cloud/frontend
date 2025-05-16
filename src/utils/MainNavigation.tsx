import React, { Suspense, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { Loader } from "@mantine/core";
import { DashboardLayout } from "../components/Layouts/DashboardLayout";
import { matchPath, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { DashboardRoutes, guestRoutes } from "../Router";
import { NotFoundPage } from "@/pages/common/NotFoundPage";

const MainNavigation = () => {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const guestPaths = guestRoutes.map((r) => r.path);

  useEffect(() => {
    const isGuestRoute = guestPaths.some((path) =>
      matchPath(path, location.pathname)
    );

    if (!loggedIn && !isGuestRoute) {
      navigate("/login");
    }
  }, [loggedIn, location]);


  if (loggedIn) {
    return (
      <DashboardLayout>
        {/* <Suspense fallback={<Loader />}> */}
        <Routes>
          {DashboardRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {/* </Suspense> */}
      </DashboardLayout>
    );
  }
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {guestRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default MainNavigation;
