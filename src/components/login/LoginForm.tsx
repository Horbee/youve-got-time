import { SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineEmail } from "react-icons/md";

import { Button, Stack, Text, TextInput } from "@mantine/core";

import { LoginFormValues } from "../../types";
import { GoogleLoginButton } from "./GoogleLoginButton";

export const LoginForm = ({
  onSubmit,
}: {
  onSubmit: SubmitHandler<LoginFormValues>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  return (
    <div>
      <h1>Sign into your account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="sm">
          <TextInput
            label="Email"
            icon={<MdOutlineEmail />}
            placeholder="Your email"
            error={errors.email?.message}
            {...register("email", { required: "Email is required" })}
          />

          <Button
            type="submit"
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            disabled={isSubmitting}
          >
            Email a Login Link
          </Button>

          <Text color="dimmed" align="center">
            - or -
          </Text>

          <GoogleLoginButton />
        </Stack>
      </form>
    </div>
  );
};
