import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, Modal, Select, Stack, Text, Textarea, useMantineTheme } from '@mantine/core'
import { TimeRangeInput } from '@mantine/dates'

import { SendDateValues } from '../types/SendDateValues'

import type { ModalProps } from "@mantine/core";
interface SendDateModalProps extends ModalProps {
  selectedDate: Date | null;
}

export const SendDateModal = ({
  selectedDate,
  ...restProps
}: SendDateModalProps) => {
  const theme = useMantineTheme();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<SendDateValues>();

  const onSubmit: SubmitHandler<SendDateValues> = async (values) => {
    console.log(values);
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

          <Select
            label="Availability"
            placeholder="Pick one"
            data={[
              { value: "good", label: "Available" },
              { value: "maybe", label: "Maybe" },
              { value: "notgood", label: "Not good" },
            ]}
            {...register("availability")}
            onChange={(value) => setValue("availability", value)}
          />

          <TimeRangeInput
            label="Appointment time"
            clearable
            {...register("time")}
            onChange={(value) => setValue("time", value)}
          />

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
      {/* Modal content */}
    </Modal>
  );
};
