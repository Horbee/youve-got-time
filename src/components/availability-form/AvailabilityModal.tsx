import { toast } from "react-toastify"

import { Modal, Text, useMantineTheme } from "@mantine/core"

import { useAuth, useAvailabilityModal } from "../../context"
import { AvailabilityForm } from "./AvailabilityForm"

import type { ModalProps } from "@mantine/core";
import type { AvailabilityDocument, AvailabilityFormValues } from "../../types";
interface AvailabilityFormModalProps
  extends Omit<ModalProps, "opened" | "onClose"> {
  selectedDate: Date | null;
}

export const AvailabilityModal = ({
  selectedDate,
  ...restProps
}: AvailabilityFormModalProps) => {
  const {
    opened,
    selectedAvailability,
    closeModal,
    createAvailability,
    updateAvailability,
  } = useAvailabilityModal();
  const theme = useMantineTheme();
  const { user } = useAuth();

  const saveAvailability = async (values: AvailabilityFormValues) => {
    try {
      const { time, available, ...restValues } = values;
      const document: AvailabilityDocument = {
        ...restValues,
        available: available!,
        uid: user!.uid,
        date: selectedDate!,
        fromTime: time[0] ?? null,
        untilTime: time[1] ?? null,
      };

      const promise = selectedAvailability
        ? updateAvailability(document)
        : createAvailability(document);

      await toast.promise<any>(promise, {
        pending: "Saving...",
        success: "Availability saved 👌",
        error: "Availability not sent 🤯",
      });

      localStorage.setItem("lastUsedUsername", values.name);
      closeModal();
    } catch (error: any) {
      toast.error(error.message || "Availability not sent.");
    }
  };

  return (
    <Modal
      title="Are you available?"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={closeModal}
      {...restProps}
    >
      <Text>{selectedDate?.toDateString()}</Text>
      <AvailabilityForm
        submitCallback={saveAvailability}
        selectedAvailability={selectedAvailability}
      />
    </Modal>
  );
};
