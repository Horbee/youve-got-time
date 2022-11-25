import { ActionFunction, Outlet, redirect } from "react-router-dom"
import { toast } from "react-toastify"

import { MotionContainer } from "../components/motion-components"
import { AppRoutes, sendFirebaseLoginEmail } from "../config"
import { useAuthenticatedRedirect } from "../hooks"

const LoginPage = () => {
  useAuthenticatedRedirect(AppRoutes.Start);

  return (
    <MotionContainer
      size="xs"
      px="md"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Outlet />
    </MotionContainer>
  );
};

export default LoginPage;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;

  if (!email) {
    return { errors: { email: "Email is required" } };
  }

  try {
    await sendFirebaseLoginEmail(email);
    window.localStorage.setItem("emailForSignIn", email);
  } catch (error: any) {
    console.error(error);
    toast.error(error.message || "We couldn't send the email.");
    return error;
  }

  return redirect(`/login/success?email=${email}`);
};
