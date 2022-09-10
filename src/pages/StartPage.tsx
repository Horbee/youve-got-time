import isSameDay from "date-fns/isSameDay";
import { useState } from "react";
import { MdLogout } from "react-icons/md";

import { Button, Center, Container, createStyles, Group } from "@mantine/core";
import { Calendar } from "@mantine/dates";

import { AvailabilityModal } from "../components/availability-form/AvailabilityModal";
import { AvailabilityList } from "../components/AvailabilityList";
import { OwnAvailability } from "../components/OwnAvailability";
import { ToggleColorSchemeButton } from "../components/ToggleColorSchemeButton";
import { firebaseLogout } from "../config/firebase";
import { AvailabilityModalProvider } from "../context/AvailabilityModalProvider";
import { useAvailabilities } from "../context/AvailabilityProvider";

const useStyles = createStyles((theme) => ({
  weekend: {
    color: `${theme.colors.indigo[9]} !important`,
  },
}));

export const StartPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
    <AvailabilityModalProvider>
      <AvailabilityModal selectedDate={selectedDate} />
      <Container size="xs" px="xs">
        <Group position="apart">
          <h3>Select a date</h3>

          <Group>
            <ToggleColorSchemeButton />
            <Button
              leftIcon={<MdLogout />}
              variant="outline"
              color="red"
              onClick={firebaseLogout}
            >
              Logout
            </Button>
          </Group>
        </Group>
        <Center>
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            dayStyle={(date) => ({
              backgroundColor: getDateColor(date),
              borderRadius: "50%",
              // border: "1px solid #fff",
            })}
            dayClassName={(date, modifiers) =>
              cx({ [classes.weekend]: modifiers.weekend })
            }
          />
        </Center>

        {selectedDate && (
          <>
            <OwnAvailability selectedDate={selectedDate} />
            <AvailabilityList selectedDate={selectedDate} />
          </>
        )}
      </Container>
    </AvailabilityModalProvider>
  );
};
