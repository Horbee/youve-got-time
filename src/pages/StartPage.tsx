import isSameDay from "date-fns/isSameDay"
import { useState } from "react"
import { MdLogout } from "react-icons/md"

import { Button, Center, createStyles, Group } from "@mantine/core"
import { Calendar } from "@mantine/dates"

import { AvailabilityList, OwnAvailability, ToggleColorSchemeButton } from "../components"
import { AvailabilityModal } from "../components/availability-form"
import { MotionContainer } from "../components/motion-components"
import { firebaseLogout } from "../config/firebase"
import { AvailabilityModalProvider, useAvailabilities } from "../context"

const useStyles = createStyles((theme) => ({
  weekend: {
    color: `${theme.colors.indigo[9]} !important`,
  },
}));

const StartPage = () => {
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
      <MotionContainer
        size="xs"
        px="xs"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
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
      </MotionContainer>
    </AvailabilityModalProvider>
  );
};

export default StartPage;
