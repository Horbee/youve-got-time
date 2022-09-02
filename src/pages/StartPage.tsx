import { useEffect, useState } from 'react'

import { Center, Container, createStyles } from '@mantine/core'
import { Calendar } from '@mantine/dates'

import { SendDateModal } from '../components/SendDateModal'
import { firebaseLogout } from '../config/firebase'

const useStyles = createStyles((theme) => ({
  unavailable: {
    background: `${theme.colors.red[5]} !important`,
    border: "1px solid white",
  },
  weekend: {
    color: `${theme.colors.indigo[9]} !important`,
  },
}));

export const StartPage = () => {
  const [value, setValue] = useState<Date | null>(null);
  const [opened, setOpened] = useState(false);
  const { classes, cx } = useStyles();

  useEffect(() => {
    if (value) setOpened(true);
  }, [value]);

  return (
    <>
      <SendDateModal
        selectedDate={value}
        opened={opened}
        onClose={() => setOpened(false)}
      />
      <Container size="xs" px="xs">
        <h3>Select a date</h3>
        <button onClick={firebaseLogout}>Logout</button>
        <Center>
          <Calendar
            value={value}
            onChange={setValue}
            dayClassName={(date, modifiers) =>
              cx({
                [classes.unavailable]: modifiers.weekend,
                [classes.weekend]: modifiers.weekend,
              })
            }
          />
        </Center>
      </Container>
    </>
  );
};
