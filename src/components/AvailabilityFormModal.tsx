import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

import { Button, Modal, Stack, Text, Textarea, TextInput, useMantineTheme } from "@mantine/core"

import { addFirebaseDocument } from "../config/firebase"
import { useAuth } from "../context/AuthProvider"
import { AppointmentTimeInput, AvailabilitySelect } from "./fields"

import type { SubmitHandler } from "react-hook-form";
import type { AvailabilityFormValues } from "../types";
import type { ModalProps } from "@mantine/core";
interface AvailabilityFormModalProps extends ModalProps {
  selectedDate: Date | null;
}

export const AvailabilityFormModal = ({
  selectedDate,
  ...restProps
}: AvailabilityFormModalProps) => {
  const theme = useMantineTheme();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = useForm<AvailabilityFormValues>({
    defaultValues: {
      name: localStorage.getItem("lastUsedUsername") ?? "",
      comment: "",
    },
  });

  const onSubmit: SubmitHandler<AvailabilityFormValues> = async (values) => {
    const { time, ...restValues } = values;

    try {
      await addFirebaseDocument("availabilities", {
        ...restValues,
        uid: user?.uid,
        date: selectedDate,
        fromTime: time[0] ?? null,
        untilTime: time[1] ?? null,
      });

      localStorage.setItem("lastUsedUsername", values.name);
      reset();
      reset({ name: values.name });
      restProps.onClose();
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
      {...restProps}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Text>{selectedDate?.toDateString()}</Text>

          <TextInput
            withAsterisk
            placeholder="Your name"
            label="Name"
            error={errors.name?.message}
            {...register("name", { required: "Name is required" })}
          />

          <AvailabilitySelect control={control} />

          <AppointmentTimeInput control={control} />

          <Textarea
            placeholder="Your comment"
            label="Your comment"
            {...register("comment")}
          />

          <Button
            type="submit"
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            disabled={isSubmitting}
          >
            Send
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};