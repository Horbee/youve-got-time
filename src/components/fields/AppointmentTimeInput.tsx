import { useController } from 'react-hook-form'

import { TimeRangeInput } from '@mantine/dates'

import type { Control } from "react-hook-form";
import type { SendDateValues } from "../../types";

interface AppointmentTimeInputProps {
  control: Control<SendDateValues, any>;
}

export const AppointmentTimeInput = ({
  control,
}: AppointmentTimeInputProps) => {
  const {
    field: { onChange, onBlur, name, value, ref },
  } = useController<SendDateValues>({
    name: "time",
    control,
    defaultValue: [null, null],
  });

  console.log(value);

  return (
    <TimeRangeInput
      label="Appointment time"
      clearable
      onChange={onChange}
      onBlur={onBlur}
      value={value as [Date | null, Date | null]}
      name={name}
      ref={ref}
    />
  );
};
