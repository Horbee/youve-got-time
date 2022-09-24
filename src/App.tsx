import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import { Footer } from "./components"
import { AuthenticatedRoute } from "./components/AuthenticatedRoute"
import { AppRoutes } from "./config/app-routes"
import { AppMantineProvider } from "./context/AppMantineProvider"
import { AuthProvider } from "./context/AuthProvider"
import { AvailabilityProvider } from "./context/AvailabilityProvider"
import { AboutPage, LoginPage, LoginRedirectPage, StartPage } from "./pages"

export const App = () => {
  return (
    <AuthProvider>
      <AppMantineProvider>
        <BrowserRouter>
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
