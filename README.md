# You've got time

Open source project for synchronizing the availabilities of people.

## Local setup

### Firebase Setup

Clone the project. The project uses Firebase. To run it, you must set up and connect to a Firebase project or use the Firebase emulator.

`Authentication` and `Firestore` must be configured. Add a new Web project to get the configuration details.

The necessary configurations are stored in the `.env` file.
Duplicate it and rename to `.env.local` and paste the firebase configuration details from the project you created.

Alternatively you can configure the firebase `emulators` on you local machine. For this you will need `Java 11` and `firebase-tools` to be installed globally. Follow the instructions here for initialization: https://firebase.google.com/docs/emulator-suite/connect_and_prototype

Paste in the following code to: `src/config/firebase.ts` (change port number if necessary):

```typescript
if (window.location.hostname === "localhost") {
  connectAuthEmulator(firebaseAuth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}
```

### Start the React app

```
npm install
npm start
```
