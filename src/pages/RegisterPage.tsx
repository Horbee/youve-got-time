import { useForm } from 'react-hook-form'
import { MdOutlineEmail, MdOutlinePassword } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Anchor, Button, Container, PasswordInput, Stack, TextInput } from '@mantine/core'

import { AppRoutes } from '../config/app-routes'
import { firebaseRegister } from '../config/firebase'
import { useAuthenticatedRedirect } from '../hooks/useAuthenticatedRedirect'

import type { SubmitHandler } from "react-hook-form";
import type { RegsiterValues } from "../types/RegisterValues";
export const RegisterPage = () => {
  useAuthenticatedRedirect(AppRoutes.Start);

  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegsiterValues>();

  const onSubmit: SubmitHandler<RegsiterValues> = async ({
    email,
    password,
  }) => {
    try {
      await firebaseRegister(email, password);
    } catch (error: any) {
      resetField("password");
      resetField("confirmPassword");
      console.error(error);
      toast.error(error.message || "User is not created.");
    }
  };

  return (
    <Container size="xs" px="xs">
      <div>
        <h1>Register</h1>
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
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "Password must contain at least 6 characters",
                },
                required: "Password is required",
              })}
            />

            <PasswordInput
              icon={<MdOutlinePassword />}
              placeholder="Your password again"
              label="Confirm Password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords must match.",
              })}
            />

            <Button
              type="submit"
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
              disabled={isSubmitting}
            >
              Register
            </Button>

            <Anchor component={Link} to={AppRoutes.Login}>
              Login
            </Anchor>
          </Stack>
        </form>
      </div>
    </Container>
  );
};
