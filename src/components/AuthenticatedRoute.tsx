import { Navigate } from 'react-router-dom'

import { AppRoutes } from '../config/app-routes'
import { useAuth } from '../context/AuthProvider'

export const AuthenticatedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to={AppRoutes.Login} />;
};
