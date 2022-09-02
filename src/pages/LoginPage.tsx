import { SubmitHandler, useForm } from 'react-hook-form'
import { MdOutlineEmail, MdOutlinePassword } from 'react-icons/md'
import { toast } from 'react-toastify'

import { Button, Container, Input, PasswordInput, Stack } from '@mantine/core'

import { AppRoutes } from '../config/app-routes'
import { firebaseLogin } from '../config/firebase'
import { useAuthenticatedRedirect } from '../hooks/useAuthenticatedRedirect'
import { LoginValues } from '../types/LoginValues'

export const LoginPage = () => {
  useAuthenticatedRedirect(AppRoutes.Start);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>();

  const onSubmit: SubmitHandler<LoginValues> = async ({ email, password }) => {
    try {
      await firebaseLogin(email, password);
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
            <div>
              <Input.Label>Email</Input.Label>
              <Input
                icon={<MdOutlineEmail />}
                placeholder="Your email"
                invalid={!!errors.email?.message}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <Input.Error>{errors.email.message}</Input.Error>
              )}
            </div>

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
          </Stack>
        </form>
      </div>
    </Container>
  );
};
