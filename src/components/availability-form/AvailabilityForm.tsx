import { Button, Stack, Textarea, TextInput } from "@mantine/core"

import { useAvailabilityForm } from "../../hooks"
import { AppointmentTimeInput, AvailabilitySelect } from "../fields"

import type { SubmitHandler } from "react-hook-form";
import type { Availability, AvailabilityFormValues } from "../../types";
interface AvailabilityFormProps {
  submitCallback?: (values: AvailabilityFormValues) => void;
  selectedAvailability?: Availability;
}

export const AvailabilityForm = ({
  submitCallback,
  selectedAvailability,
}: AvailabilityFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useAvailabilityForm(selectedAvailability);

  const onSubmit: SubmitHandler<AvailabilityFormValues> = async (values) => {
    submitCallback?.(values);
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
