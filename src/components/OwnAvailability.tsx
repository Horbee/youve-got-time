import isSameDay from "date-fns/isSameDay";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

import { ActionIcon, Button, Group } from "@mantine/core";

import { deleteFirebaseDocument } from "../config/firebase";
import { useAuth, useAvailabilities } from "../context";
import { useAvailabilityModal } from "../context/AvailabilityModalProvider";
import { AvailabilityCard } from "./AvailabilityCard";

interface OwnAvailabilityProps {
  selectedDate: Date;
}

export const OwnAvailability = ({ selectedDate }: OwnAvailabilityProps) => {
  const { availabilities } = useAvailabilities();
  const { user } = useAuth();
  const { openModal } = useAvailabilityModal();

  const myAvailability = availabilities.find(
    (a) => isSameDay(a.date, selectedDate) && a.uid === user?.uid
  );

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await deleteFirebaseDocument("availabilities", myAvailability!.id);
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

        <Group>
          <ActionIcon
            color="orange"
            variant="outline"
            onClick={() => openModal(myAvailability)}
            disabled={!myAvailability}
          >
            <MdEdit size={18} />
          </ActionIcon>

          <ActionIcon
            color="red"
            variant="outline"
            onClick={handleDelete}
            disabled={!myAvailability}
          >
            <MdDelete size={18} />
          </ActionIcon>
        </Group>
      </Group>

      {myAvailability ? (
        <AvailabilityCard av={myAvailability} />
      ) : (
        <Button
          variant="gradient"
          gradient={{ from: "teal", to: "lime", deg: 105 }}
          onClick={() => openModal()}
        >
          Create Availability
        </Button>
      )}
    </div>
  );
};
