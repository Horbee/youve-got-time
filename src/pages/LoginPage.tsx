import { useState } from "react";
import { toast } from "react-toastify";

import { Container } from "@mantine/core";

import { LoginForm, LoginSuccess } from "../components/login";
import { AppRoutes, sendFirebaseLoginEmail } from "../config";
import { useAuthenticatedRedirect } from "../hooks";

import type { SubmitHandler } from "react-hook-form";
import type { LoginFormValues } from "../types";

export const LoginPage = () => {
  useAuthenticatedRedirect(AppRoutes.Start);
  const [emailSent, setIsEmailSent] = useState({
    email: "",
    status: false,
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async ({ email }) => {
    try {
      await sendFirebaseLoginEmail(email);
      window.localStorage.setItem("emailForSignIn", email);
      setIsEmailSent({ email, status: true });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "We couldn't send the email.");
    }
  };

  return (
    <Container size="xs" px="md">
      {emailSent.status ? (
        <LoginSuccess email={emailSent.email} />
      ) : (
        <LoginForm onSubmit={onSubmit} />
      )}
    </Container>
  );
};
