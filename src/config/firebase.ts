import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, sendSignInLinkToEmail, signInWithPopup, signOut } from "firebase/auth"
import { addDoc, collection, deleteDoc, doc, DocumentData, getFirestore, setDoc } from "firebase/firestore"

import { AppRoutes } from "./app-routes"

const firebaseConfig: {
  [key: string]: string | undefined;
} = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  appId: import.meta.env.VITE_APP_ID,
};

if (Object.values(firebaseConfig).some((value) => value === undefined)) {
  throw Error("Some firebase configuration variable is missing");
}

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);

export const sendFirebaseLoginEmail = (email: string) => {
  return sendSignInLinkToEmail(firebaseAuth, email, {
    url: window.location.origin + AppRoutes.LoginRedirect,
    handleCodeInApp: true,
  });
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
