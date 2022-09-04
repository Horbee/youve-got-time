import { createContext, useContext } from "react"

import { useFirebaseCollection } from "../hooks"
import { mapToAvailability } from "../mappers/availability-mapper"
import { Availability } from "../types"

import type { ReactNode } from "react";
const AvailabilityContext = createContext<
  { availabilities: Availability[] } | undefined
>(undefined);

export const AvailabilityProvider = ({ children }: { children: ReactNode }) => {
  const [availabilities] = useFirebaseCollection(
    mapToAvailability,
    "availabilities"
  );

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
