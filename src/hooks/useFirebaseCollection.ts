import { collection, FirestoreError, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"

import { db } from "../config/firebase"

type MappingFunction<T, K> = (data: T, id: string) => K;

type UseFirebaseCollectionReturn<K> = [K[], FirestoreError | undefined];

export const useFirebaseCollection = <T, K>(
  mapper: MappingFunction<T, K>,
  path: string
): UseFirebaseCollectionReturn<K> => {
  const [documents, setDocuments] = useState<K[]>([]);
  const [error, setError] = useState<FirestoreError>();

  useEffect(() => {
    const q = query(collection(db, path));

    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        const docs: K[] = [];
        querySnapshot.forEach((doc) => {
          docs.push(mapper(doc.data() as T, doc.id));
        });

        setDocuments(docs);
      },
      setError
    );

    return () => unsub();
  }, [mapper, path]);

  return [documents, error];
};
