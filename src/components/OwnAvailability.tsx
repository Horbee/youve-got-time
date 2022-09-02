import isSameDay from 'date-fns/isSameDay'
import { deleteDoc, doc } from 'firebase/firestore'
import { MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify'

import { ActionIcon, Button, Group } from '@mantine/core'

import { db } from '../config/firebase'
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

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await deleteDoc(doc(db, "availabilities", myAvailability!.id));
      } catch (error: any) {
        console.error(error);
        toast.error(error?.message || "Availability is not deleted");
      }
    }
  };

  return (
    <div>
      <Group position="apart">
        <h4>Own Availability:</h4>

        <ActionIcon
          color="red"
          variant="outline"
          onClick={handleDelete}
          disabled={!myAvailability}
        >
          <MdDelete size={18} />
        </ActionIcon>
      </Group>

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
