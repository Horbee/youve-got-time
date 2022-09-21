import { Link, useLocation } from "react-router-dom"

import { Anchor } from "@mantine/core"

import { AppRoutes } from "../config/app-routes"

export const Footer = () => {
  const location = useLocation();

  return (
    <footer>
      {location.pathname === AppRoutes.About ? (
        <Anchor component={Link} to={AppRoutes.Start}>
          Home
        </Anchor>
      ) : (
        <Anchor component={Link} to={AppRoutes.About}>
          About
        </Anchor>
      )}
    </footer>
  );
};
