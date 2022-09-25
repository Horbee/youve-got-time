import { lazy, Suspense } from "react"
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import { LoadingOverlay } from "@mantine/core"

import { AuthenticatedRoute, PageLayout } from "./components"
import { LoginForm, LoginSuccess } from "./components/login"
import { AppRoutes } from "./config/app-routes"
import { AppMantineProvider, AuthProvider, AvailabilityProvider } from "./context"
import { action as loginAction } from "./pages/LoginPage"

const StartPage = lazy(() => import("./pages/StartPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const LoginRedirectPage = lazy(() => import("./pages/LoginRedirectPage"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PageLayout />}>
      <Route
        index
        element={
          <AuthenticatedRoute>
            <AvailabilityProvider>
              <StartPage />
            </AvailabilityProvider>
          </AuthenticatedRoute>
        }
      />
      <Route path="login" element={<LoginPage />} action={loginAction}>
        <Route index element={<LoginForm />} />
        <Route path="success" element={<LoginSuccess />} />
      </Route>
      <Route path="about" element={<AboutPage />} />
      <Route path="redirect" element={<LoginRedirectPage />} />
      <Route path="*" element={<Navigate to={AppRoutes.Start} />} />
    </Route>
  )
);

export const App = () => {
  return (
    <AuthProvider>
      <AppMantineProvider>
        <Suspense
          fallback={
            <LoadingOverlay
              visible
              loaderProps={{ size: 50, variant: "bars" }}
              transitionDuration={500}
            />
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </AppMantineProvider>
      <ToastContainer
        position="bottom-center"
        theme="colored"
        autoClose={8000}
      />
    </AuthProvider>
  );
};
