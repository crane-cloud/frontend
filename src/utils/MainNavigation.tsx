import React, { Suspense, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { Loader } from "@mantine/core";
import { DashboardLayout } from "../components/Layouts/DashboardLayout";
import { Route, Routes, useNavigate } from "react-router-dom";
import { DashboardRoutes, guestRoutes } from "../Router";
import { NotFoundPage } from "@/pages/common/NotFoundPage";

const MainNavigation = () => {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn]);
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
