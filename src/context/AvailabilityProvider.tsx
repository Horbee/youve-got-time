import { collection, onSnapshot, query } from "firebase/firestore"
import { createContext, useContext, useEffect, useState } from "react"

import { db } from "../config/firebase"
import { mapToAvailability } from "../mappers/availability-mapper"
import { Availability } from "../types"

import type { AvailabilityData } from "../models/AvailabilityData";
import type { ReactNode } from "react";
const AvailabilityContext = createContext<
  { availabilities: Availability[] } | undefined
>(undefined);

export const AvailabilityProvider = ({ children }: { children: ReactNode }) => {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);

  useEffect(() => {
    const q = query(collection(db, "availabilities"));

    const unsub = onSnapshot(q, (querySnapshot) => {
      const availabilities: Availability[] = [];
      querySnapshot.forEach((doc) => {
        availabilities.push(
          mapToAvailability(doc.data() as AvailabilityData, doc.id)
        );
      });

      setAvailabilities(availabilities);
    });

    return () => unsub();
  }, []);

  return (
    <AvailabilityContext.Provider value={{ availabilities }}>
      {children}
    </AvailabilityContext.Provider>
  );
};

export const useAvailabilities = () => {
  const ctx = useContext(AvailabilityContext);

  if (ctx === undefined) {
    throw Error("useAvailabilities must be used within AvailabilityProvider");
  }

  return ctx;
};
