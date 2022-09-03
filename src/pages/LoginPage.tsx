import { SubmitHandler, useForm } from 'react-hook-form'
import { MdOutlineEmail, MdOutlinePassword } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Anchor, Button, Container, PasswordInput, Stack, TextInput } from '@mantine/core'

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

            <Anchor component={Link} to={AppRoutes.Register}>
              Register
            </Anchor>
          </Stack>
        </form>
      </div>
    </Container>
  );
};
