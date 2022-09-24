import { useForm } from "react-hook-form";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { toast } from "react-toastify";

import {
  Button,
  Container,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";

import { GoogleLoginButton } from "../components/GoogleLoginButton";
import { AppRoutes } from "../config/app-routes";
import { sendFirebasePassworldessEmail } from "../config/firebase";
import { useAuthenticatedRedirect } from "../hooks";

import type { SubmitHandler } from "react-hook-form";
import type { LoginFormValues } from "../types";
export const LoginPage = () => {
  useAuthenticatedRedirect(AppRoutes.Start);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = async ({
    email,
    password,
  }) => {
    try {
      await sendFirebasePassworldessEmail(email);
      window.localStorage.setItem("emailForSignIn", email);
      toast.success("Email link is sent.");
    } catch (error: any) {
      resetField("password");
      console.error(error);
      toast.error(error.message || "Wrong username or password");
    }
  };

  return (
    <Container size="xs" px="xs">
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="sm">
            <TextInput
              label="Email"
              icon={<MdOutlineEmail />}
              placeholder="Your email"
              error={errors.email?.message}
              {...register("email", { required: "Email is required" })}
            />

            <PasswordInput
              icon={<MdOutlinePassword />}
              placeholder="Password"
              label="Password"
              error={errors.password?.message}
              {...register("password", { required: "Password is required" })}
            />
            <Button
              type="submit"
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
              disabled={isSubmitting}
            >
              Login
            </Button>
            <GoogleLoginButton />
          </Stack>
        </form>
      </div>
    </Container>
  );
};
