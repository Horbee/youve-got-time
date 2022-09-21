import { useForm } from "react-hook-form"

import type { Availability, AvailabilityFormValues } from "../types";

export const useAvailabilityForm = (availability?: Availability) => {
  const defaultValues: AvailabilityFormValues = {
    name: availability?.name ?? localStorage.getItem("lastUsedUsername") ?? "",
    available: availability?.available ?? null,
    time: [availability?.fromTime ?? null, availability?.untilTime ?? null],
    comment: availability?.comment ?? "",
  };

  return useForm<AvailabilityFormValues>({
    defaultValues,
  });
};
