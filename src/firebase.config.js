import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8Au7VrW2TxD_HMW845JdJiYpLR9LatlA",
  authDomain: "foodorder-dc55e.firebaseapp.com",
  databaseURL: "https://foodorder-dc55e-default-rtdb.firebaseio.com",
  projectId: "foodorder-dc55e",
  storageBucket: "foodorder-dc55e.appspot.com",
  messagingSenderId: "505840304693",
  appId: "1:505840304693:web:a54b5f1b035acadb47a77c",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
