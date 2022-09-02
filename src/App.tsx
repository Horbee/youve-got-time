import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { MantineProvider } from '@mantine/core'

import { AuthenticatedRoute } from './components/AuthenticatedRoute'
import { AppRoutes } from './config/app-routes'
import { AuthProvider } from './context/AuthProvider'
import { LoginPage, RegisterPage, StartPage } from './pages'

export const App = () => {
  return (
    <AuthProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <Routes>
            <Route
              path={AppRoutes.Start}
              element={
                <AuthenticatedRoute>
                  <StartPage />
                </AuthenticatedRoute>
              }
            />
            <Route path={AppRoutes.Login} element={<LoginPage />} />
            <Route path={AppRoutes.Register} element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
      <ToastContainer
        position="bottom-center"
        theme="colored"
        autoClose={8000}
      />
    </AuthProvider>
  );
};
