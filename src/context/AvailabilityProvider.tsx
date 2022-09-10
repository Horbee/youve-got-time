import { createContext, useContext, useEffect } from "react";
import { toast } from "react-toastify";

import { useFirebaseCollection } from "../hooks";
import { mapToAvailability } from "../mappers/availability-mapper";

import type { Availability } from "../types";
import type { ReactNode } from "react";

const AvailabilityContext = createContext<
  { availabilities: Availability[] } | undefined
>(undefined);

export const AvailabilityProvider = ({ children }: { children: ReactNode }) => {
  const [availabilities, error] = useFirebaseCollection(
    mapToAvailability,
    "availabilities"
  );

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      console.error(error);
    }
  }, [error]);

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
