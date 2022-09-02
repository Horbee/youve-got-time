import { useState } from 'react'

import { Container } from '@mantine/core'
import { Calendar } from '@mantine/dates'

import { firebaseLogout } from '../config/firebase'

export const StartPage = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <Container size="xs" px="xs">
      StartPage
      <button onClick={firebaseLogout}>Logout</button>
      <Calendar value={value} onChange={setValue} />
    </Container>
  );
};
