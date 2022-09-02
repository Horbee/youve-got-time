import isSameDay from 'date-fns/isSameDay'
import { useMemo } from 'react'

import { Stack } from '@mantine/core'

import { useAuth } from '../context/AuthProvider'
import { useAvailabilities } from '../context/AvailabilityProvider'
import { AvailabilityCard } from './AvailabilityCard'

export const AvailabilityList = ({ selectedDate }: { selectedDate: Date }) => {
  const { availabilities } = useAvailabilities();
  const { user } = useAuth();

  const filteredAvailabilities = useMemo(() => {
    return availabilities.filter(
      (a) => isSameDay(a.date, selectedDate) && a.uid !== user?.uid
    );
  }, [availabilities, selectedDate, user]);

  return (
    <div>
      <h4>Availability of others:</h4>

      <Stack>
        {filteredAvailabilities.map((av) => (
          <AvailabilityCard key={av.id} av={av} />
        ))}
      </Stack>
    </div>
  );
};
