import { Card, Stack, Text } from "@mantine/core";

export const LoginSuccess = ({ email }: { email: string }) => {
  return (
    <Card shadow="sm" p="lg" radius="md" mt="lg" withBorder>
      <Stack spacing="sm" align="center">
        <h1>Email Sent</h1>

        <Text align="center">
          Check your inbox! If we found your email address ({email}) you'll have
          a link to login and access your account.
        </Text>

        <Text align="center">
          Sometimes this can land in SPAM! While we hope that isn't the case, if
          it doesn't arrive in a minute or three, please check.
        </Text>
      </Stack>
    </Card>
  );
};
