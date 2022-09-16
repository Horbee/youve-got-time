import format from "date-fns/format"

import { Card, Group, Stack, Text } from "@mantine/core"

import { Availability } from "../types"
import { AvailabilityBadge } from "./AvailabilityBadge"

export const AvailabilityCard = ({ av }: { av: Availability }) => {
  return (
    <Card key={av.id} shadow="sm" p="sm" radius="md" withBorder>
      <Group position="apart">
        <Text weight={500}>{av.name}</Text>
        <Stack style={{ gap: 0 }} align="center">
          <AvailabilityBadge type={av.available} />
          <Text size="sm" color="dimmed">
            {getTime(av.fromTime, av.untilTime)}
          </Text>
        </Stack>
      </Group>

      <Text size="sm" color="dimmed">
        {av.comment}
      </Text>
    </Card>
  );
};

const getTime = (fromTime?: Date | null, untilTime?: Date | null): string => {
  const elements: string[] = [];

  if (fromTime) elements.push(format(fromTime, "HH:mm"));
  elements.push("-");
  if (untilTime) elements.push(format(untilTime, "HH:mm"));

  return elements.join("");
};
