import { Outlet } from "react-router-dom"

import { Footer } from "./"

export const PageLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};
