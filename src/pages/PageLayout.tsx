import { Outlet } from "react-router-dom"

import { Footer } from "../components"

export const PageLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};
