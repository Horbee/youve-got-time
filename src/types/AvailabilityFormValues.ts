export type AvailabilityFormValues = {
  name: string;
  available: string | null;
  time: [Date | null, Date | null];
  comment: string;
};
