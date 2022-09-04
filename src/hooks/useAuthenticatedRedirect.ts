import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { AppRoutes } from "../config/app-routes"
import { useAuth } from "../context/AuthProvider"

export const useAuthenticatedRedirect = (to: AppRoutes) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate(to);
  }, [user, to, navigate]);
};
