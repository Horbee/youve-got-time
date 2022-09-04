import isSameDay from "date-fns/isSameDay"
import { useState } from "react"
import { MdLogout } from "react-icons/md"

import { Button, Center, Container, createStyles, Group } from "@mantine/core"
import { Calendar } from "@mantine/dates"

import { AvailabilityList } from "../components/AvailabilityList"
import { OwnAvailability } from "../components/OwnAvailability"
import { SendDateModal } from "../components/SendDateModal"
import { firebaseLogout } from "../config/firebase"
import { useAvailabilities } from "../context/AvailabilityProvider"

const useStyles = createStyles((theme) => ({
  weekend: {
    color: `${theme.colors.indigo[9]} !important`,
  },
}));

export const StartPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [opened, setOpened] = useState(false);
  const { classes, cx } = useStyles();
  const { availabilities } = useAvailabilities();

  const getDateColor = (currentDate: Date) => {
    const data = availabilities.filter((a) => isSameDay(a.date, currentDate));
    if (data.some((d) => d.available === "notgood")) {
      return "red";
    }

    const goodCount = data.filter((d) => d.available === "good").length;

    if (data.some((d) => d.available === "maybe") || goodCount === 1) {
      return "orange";
    }

    if (goodCount > 1) {
      return "green";
    }
  };

  return (
    <>
      <SendDateModal
        selectedDate={selectedDate}
        opened={opened}
        onClose={() => setOpened(false)}
      />
      <Container size="xs" px="xs">
        <Group position="apart">
          <h3>Select a date</h3>

          <Button
            leftIcon={<MdLogout />}
            variant="outline"
            color="red"
            onClick={firebaseLogout}
          >
            Logout
          </Button>
        </Group>
        <Center>
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            dayStyle={(date) => ({ backgroundColor: getDateColor(date) })}
            dayClassName={(date, modifiers) =>
              cx({ [classes.weekend]: modifiers.weekend })
            }
          />
        </Center>

        {selectedDate && (
          <>
            <OwnAvailability
              selectedDate={selectedDate}
              openModal={() => setOpened(true)}
            />
            <AvailabilityList selectedDate={selectedDate} />
          </>
        )}
      </Container>
    </>
  );
};
