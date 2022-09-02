import isSameDay from 'date-fns/isSameDay'

import { Button } from '@mantine/core'

import { useAuth } from '../context/AuthProvider'
import { useAvailabilities } from '../context/AvailabilityProvider'
import { AvailabilityCard } from './AvailabilityCard'

interface OwnAvailabilityProps {
  selectedDate: Date;
  openModal: VoidFunction;
}

export const OwnAvailability = ({
  selectedDate,
  openModal,
}: OwnAvailabilityProps) => {
  const { availabilities } = useAvailabilities();
  const { user } = useAuth();

  const myAvailability = availabilities.find(
    (a) => isSameDay(a.date, selectedDate) && a.uid === user?.uid
  );

  return (
    <div>
      <h4>Own Availability:</h4>
      {myAvailability ? (
        <AvailabilityCard av={myAvailability} />
      ) : (
        <Button
          variant="gradient"
          gradient={{ from: "teal", to: "lime", deg: 105 }}
          onClick={openModal}
        >
          Create Availability
        </Button>
      )}
    </div>
  );
};
