import { FaGithub } from "react-icons/fa"

import { Anchor, Card, Container, Group, Text } from "@mantine/core"

const AboutPage = () => {
  return (
    <Container size="xs" px="xs">
      <Card shadow="sm" p="lg" radius="md" mt="lg" withBorder>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>You've got time?</Text>
          <Anchor href="https://github.com/Horbee/youve-got-time">
            <FaGithub size={25} />
          </Anchor>
        </Group>

        <Text size="sm" color="dimmed">
          Example application to manage availabilities
        </Text>

        <Text size="sm" color="dimmed" mt="lg">
          Attributions:
        </Text>

        <Anchor
          href="https://www.flaticon.com/free-icons/time"
          title="time icons"
        >
          Time icons created by Ilham Fitrotul Hayat - Flaticon
        </Anchor>
      </Card>
    </Container>
  );
};

export default AboutPage;
