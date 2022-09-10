import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button, Stack, Textarea, TextInput } from "@mantine/core";

import {
  addFirebaseDocument,
  updateFirebaseDocument,
} from "../../config/firebase";
import { AppointmentTimeInput, AvailabilitySelect } from "../fields";

import type { SubmitHandler } from "react-hook-form";
import type { Availability, AvailabilityFormValues } from "../../types";

interface AvailabilityFormProps {
  userId: string;
  selectedDate: Date;
  onSuccessCallback?: VoidFunction;
  selectedAvailability?: Availability;
}

export const AvailabilityForm = ({
  onSuccessCallback,
  userId,
  selectedDate,
  selectedAvailability,
}: AvailabilityFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<AvailabilityFormValues>({
    defaultValues: {
      name:
        selectedAvailability?.name ??
        localStorage.getItem("lastUsedUsername") ??
        "",
      available: selectedAvailability?.available ?? null,
      time: [
        selectedAvailability?.fromTime ?? null,
        selectedAvailability?.untilTime ?? null,
      ],
      comment: selectedAvailability?.comment ?? "",
    },
  });

  const onSubmit: SubmitHandler<AvailabilityFormValues> = async (values) => {
    const { time, ...restValues } = values;

    try {
      if (selectedAvailability) {
        await updateFirebaseDocument(
          `availabilities/${selectedAvailability.id}`,
          {
            ...restValues,
            uid: userId,
            date: selectedDate,
            fromTime: time[0] ?? null,
            untilTime: time[1] ?? null,
          }
        );
      } else {
        await addFirebaseDocument("availabilities", {
          ...restValues,
          uid: userId,
          date: selectedDate,
          fromTime: time[0] ?? null,
          untilTime: time[1] ?? null,
        });
      }

      localStorage.setItem("lastUsedUsername", values.name);
      reset();
      reset({ name: values.name });
      onSuccessCallback?.();
    } catch (error: any) {
      toast.error(error.message || "Availability not sent.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
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
  );
};
