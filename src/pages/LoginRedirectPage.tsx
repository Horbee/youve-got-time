import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { Card, Stack, Text } from "@mantine/core";

import { AppRoutes } from "../config/app-routes";
import { firebaseAuth } from "../config/firebase";
import { useAuthenticatedRedirect } from "../hooks";

export const LoginRedirectPage = () => {
  useAuthenticatedRedirect(AppRoutes.Start);

  useEffect(() => {
    if (isSignInWithEmailLink(firebaseAuth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }

      signInWithEmailLink(firebaseAuth, email ?? "", window.location.href)
        .then(() => {
          window.localStorage.removeItem("emailForSignIn");
        })
        .catch((error: any) => {
          console.error(error);
          toast.error(error.message || "Error while signing in.");
        });
    }
  }, []);

  return (
    <Card shadow="sm" p="lg" radius="md" mt="lg" withBorder>
      <Stack spacing="sm" align="center">
        <h1>Logging in...</h1>

        <Text align="center">Just one more second. We are logging you in.</Text>
      </Stack>
    </Card>
  );
};
