import { lazy, Suspense } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import { LoadingOverlay } from "@mantine/core"

import { Footer } from "./components"
import { AuthenticatedRoute } from "./components/AuthenticatedRoute"
import { AppRoutes } from "./config/app-routes"
import { AppMantineProvider } from "./context/AppMantineProvider"
import { AuthProvider } from "./context/AuthProvider"
import { AvailabilityProvider } from "./context/AvailabilityProvider"

const StartPage = lazy(() => import("./pages/StartPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const LoginRedirectPage = lazy(() => import("./pages/LoginRedirectPage"));

export const App = () => {
  return (
    <AuthProvider>
      <AppMantineProvider>
        <BrowserRouter>
          <Suspense
            fallback={
              <LoadingOverlay
                visible
                loaderProps={{ size: 50, variant: "bars" }}
                transitionDuration={500}
              />
            }
          >
            <Routes>
              <Route
                path={AppRoutes.Start}
                element={
                  <AuthenticatedRoute>
                    <AvailabilityProvider>
                      <StartPage />
                    </AvailabilityProvider>
                  </AuthenticatedRoute>
                }
              />
              <Route path={AppRoutes.Login} element={<LoginPage />} />
              <Route path={AppRoutes.About} element={<AboutPage />} />
              <Route
                path={AppRoutes.LoginRedirect}
                element={<LoginRedirectPage />}
              />
              <Route path="*" element={<Navigate to={AppRoutes.Start} />} />
            </Routes>
          </Suspense>
          <Footer />
        </BrowserRouter>
      </AppMantineProvider>
      <ToastContainer
        position="bottom-center"
        theme="colored"
        autoClose={8000}
      />
    </AuthProvider>
  );
};
