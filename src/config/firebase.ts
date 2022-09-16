import { initializeApp } from "firebase/app"
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { addDoc, collection, deleteDoc, doc, DocumentData, getFirestore, setDoc } from "firebase/firestore"

const firebaseConfig: {
  [key: string]: string | undefined;
} = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  appId: process.env.REACT_APP_APP_ID,
};

if (Object.values(firebaseConfig).some((value) => value === undefined)) {
  throw Error("Some firebase configuration variable is missing");
}

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);

export const firebaseLogin = (email: string, password: string) => {
  return signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const firebaseRegister = (email: string, password: string) => {
  return createUserWithEmailAndPassword(firebaseAuth, email, password);
};

export const firebaseLoginGoogle = () => {
  return signInWithPopup(firebaseAuth, new GoogleAuthProvider());
};

export const firebaseLogout = () => {
  return signOut(firebaseAuth);
};

export const addFirebaseDocument = (path: string, data: DocumentData) => {
  return addDoc(collection(db, path), data);
};

export const updateFirebaseDocument = (path: string, data: DocumentData) => {
  return setDoc(doc(db, path), data);
};

export const deleteFirebaseDocument = (
  path: string,
  ...pathSegments: string[]
) => {
  return deleteDoc(doc(db, path, ...pathSegments));
};
