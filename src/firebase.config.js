// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZGp7fEvQW-qOsCK1HvgBeHEh9gCwY-hE",
  authDomain: "danangfood-dbec6.firebaseapp.com",
  databaseURL:
    "https://danangfood-dbec6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "danangfood-dbec6",
  storageBucket: "danangfood-dbec6.appspot.com",
  messagingSenderId: "36723461805",
  appId: "1:36723461805:web:6fad921908289345624024",
};

// Initialize Firebase
const app = getApp.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage, app };
