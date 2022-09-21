export interface Availability {
  id: string;
  name: string;
  uid: string;
  available: AvailableTypes;
  comment: string;
  date: Date;
  fromTime?: Date | null;
  untilTime?: Date | null;
}

export interface AvailabilityDocument extends Omit<Availability, "id"> {}

export type AvailableTypes = "good" | "maybe" | "notgood";

export type AvailabilityOption = { value: AvailableTypes; label: string };

export const AvailabilityOptions: AvailabilityOption[] = [
  { value: "good", label: "Available" },
  { value: "maybe", label: "Maybe" },
  { value: "notgood", label: "Not good" },
];
