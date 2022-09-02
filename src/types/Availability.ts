export interface Availability {
  id: string;
  name: string;
  uid: string;
  available: AvailableTypes;
  comment: string;
  date: Date;
  fromTime?: Date;
  untilTime?: Date;
}

export type AvailableTypes = "good" | "maybe" | "notgood";
