import { createContext, useContext, useState } from "react"

import { addFirebaseDocument, updateFirebaseDocument } from "../config/firebase"

import type { ReactNode } from "react";
import type { Availability, AvailabilityDocument } from "../types";
import type { DocumentData, DocumentReference } from "firebase/firestore";
const AvailabilityModalContext = createContext<
  | {
      opened: boolean;
      selectedAvailability?: Availability;
      openModal: (myAvailability?: Availability) => void;
      closeModal: VoidFunction;
      updateAvailability: (doc: AvailabilityDocument) => Promise<void>;
      createAvailability: (
        doc: AvailabilityDocument
      ) => Promise<DocumentReference<DocumentData>>;
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

  const updateAvailability = (doc: AvailabilityDocument) => {
    return updateFirebaseDocument(
      `availabilities/${selectedAvailability?.id}`,
      doc
    );
  };

  const createAvailability = (doc: AvailabilityDocument) => {
    return addFirebaseDocument("availabilities", doc);
  };

  return (
    <AvailabilityModalContext.Provider
      value={{
        opened,
        selectedAvailability,
        openModal,
        closeModal,
        updateAvailability,
        createAvailability,
      }}
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
