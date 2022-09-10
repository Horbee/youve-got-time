import { createContext, useContext, useState } from "react";

import type { ReactNode } from "react";
import type { Availability } from "../types";

const AvailabilityModalContext = createContext<
  | {
      opened: boolean;
      selectedAvailability?: Availability;
      openModal: (myAvailability?: Availability) => void;
      closeModal: VoidFunction;
    }
  | undefined
>(undefined);

export const AvailabilityModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [opened, setOpened] = useState(false);
  const [selectedAvailability, setSelectedAvailability] =
    useState<Availability>();

  const openModal = (myAvailability?: Availability) => {
    setSelectedAvailability(myAvailability);
    setOpened(true);
  };

  const closeModal = () => setOpened(false);

  return (
    <AvailabilityModalContext.Provider
      value={{ opened, selectedAvailability, openModal, closeModal }}
    >
      {children}
    </AvailabilityModalContext.Provider>
  );
};

export const useAvailabilityModal = () => {
  const ctx = useContext(AvailabilityModalContext);

  if (ctx === undefined) {
    throw Error(
      "useAvailabilityModal must be used within AvailabilityModalProvider"
    );
  }

  return ctx;
};
