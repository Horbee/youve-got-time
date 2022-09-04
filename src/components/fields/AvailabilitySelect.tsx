import { Control, useController } from "react-hook-form"

import { Select } from "@mantine/core"

import type { AvailabilityFormValues } from "../../types";

interface AvailabilitySelectProps {
  control: Control<AvailabilityFormValues, any>;
}

export const AvailabilitySelect = ({ control }: AvailabilitySelectProps) => {
  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { error },
  } = useController<AvailabilityFormValues>({
    name: "available",
    control,
    rules: { required: "This field is required" },
    defaultValue: null,
  });

  return (
    <Select
      withAsterisk
      label="Availability"
      placeholder="Pick one"
      data={[
        { value: "good", label: "Available" },
        { value: "maybe", label: "Maybe" },
        { value: "notgood", label: "Not good" },
      ]}
      error={error?.message}
      onChange={onChange}
      onBlur={onBlur}
      value={value as string | null}
      name={name}
      ref={ref}
    />
  );
};
