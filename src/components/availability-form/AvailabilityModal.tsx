import { Modal, Text, useMantineTheme } from "@mantine/core";

import { useAuth } from "../../context/AuthProvider";
import { useAvailabilityModal } from "../../context/AvailabilityModalProvider";
import { AvailabilityForm } from "./AvailabilityForm";

import type { ModalProps } from "@mantine/core";
interface AvailabilityFormModalProps
  extends Omit<ModalProps, "opened" | "onClose"> {
  selectedDate: Date | null;
}

export const AvailabilityModal = ({
  selectedDate,
  ...restProps
}: AvailabilityFormModalProps) => {
  const { opened, selectedAvailability, closeModal } = useAvailabilityModal();
  const theme = useMantineTheme();
  const { user } = useAuth();

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
        onSuccessCallback={closeModal}
        userId={user!.uid}
        selectedDate={selectedDate!}
        selectedAvailability={selectedAvailability}
      />
    </Modal>
  );
};
