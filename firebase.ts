import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDeC3OX0ZNkWO1-wZgprbP-j73XnOp1QdQ",
  authDomain: "blaze-plan-account.firebaseapp.com",
  databaseURL:
    "https://blaze-plan-account-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "blaze-plan-account",
  storageBucket: "blaze-plan-account.appspot.com",
  messagingSenderId: "258048658228",
  appId: "1:258048658228:web:15121bc78117a60c657361",
  measurementId: "G-H1GKNBPNRV",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { auth, db, functions };
