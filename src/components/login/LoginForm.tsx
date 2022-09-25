import { MdOutlineEmail } from "react-icons/md"
import { Form, useActionData, useNavigation } from "react-router-dom"

import { Button, Stack, Text, TextInput } from "@mantine/core"

import { GoogleLoginButton } from "./GoogleLoginButton"

export const LoginForm = () => {
  const data = useActionData() as { errors: any };
  const navigation = useNavigation();

  return (
    <div>
      <h1>Sign into your account</h1>
      <Form action="/login" method="post">
        <Stack spacing="sm">
          <TextInput
            label="Email"
            name="email"
            icon={<MdOutlineEmail />}
            placeholder="Your email"
            error={data?.errors?.email}
          />

          <Button
            type="submit"
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            disabled={navigation.state === "submitting"}
          >
            Email a Login Link
          </Button>

          <Text color="dimmed" align="center">
            - or -
          </Text>

          <GoogleLoginButton />
        </Stack>
      </Form>
    </div>
  );
};
