import { AvailableTypes } from "./Availability"

export type AvailabilityFormValues = {
  name: string;
  available: AvailableTypes | null;
  time: [Date | null, Date | null];
  comment: string;
};
