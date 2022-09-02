import { addDoc, collection } from 'firebase/firestore'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import {
    Button, Modal, Select, Stack, Text, Textarea, TextInput, useMantineTheme
} from '@mantine/core'
import { TimeRangeInput } from '@mantine/dates'

import { db } from '../config/firebase'
import { useAuth } from '../context/AuthProvider'

import type { SendDateValues } from "../types/SendDateValues";
import type { ModalProps } from "@mantine/core";
interface SendDateModalProps extends ModalProps {
  selectedDate: Date | null;
}

export const SendDateModal = ({
  selectedDate,
  ...restProps
}: SendDateModalProps) => {
  const theme = useMantineTheme();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<SendDateValues>({
    defaultValues: {
      name: localStorage.getItem("lastUsedUsername") ?? "",
      comment: "",
    },
  });

  const onSubmit: SubmitHandler<SendDateValues> = async (values) => {
    const { time, ...restValues } = values;

    try {
      await addDoc(collection(db, "availabilities"), {
        ...restValues,
        uid: user?.uid,
        date: selectedDate,
        fromTime: time[0] ?? null,
        untilTime: time[1] ?? null,
      });

      localStorage.setItem("lastUsedUsername", values.name);
      reset();
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

          <Select
            withAsterisk
            label="Availability"
            placeholder="Pick one"
            data={[
              { value: "good", label: "Available" },
              { value: "maybe", label: "Maybe" },
              { value: "notgood", label: "Not good" },
            ]}
            error={errors.available?.message}
            // {...register("available", { required: "This field is required" })}
            value={watch("available")}
            onChange={(value) => setValue("available", value)}
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
