import { Timestamp } from "firebase/firestore"

export interface AvailabilityData {
  name: string;
  uid: string;
  available: "good" | "maybe" | "notgood";
  comment: string;
  date: Timestamp;
  fromTime?: Timestamp;
  untilTime?: Timestamp;
}
