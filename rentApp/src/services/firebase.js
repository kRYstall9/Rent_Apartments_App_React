import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCZFw_qspCXK7-2k3LCDLXgHHrzt4Hx7bU",
  authDomain: "apartementsapp.firebaseapp.com",
  projectId: "apartementsapp",
  storageBucket: "apartementsapp.appspot.com",
  messagingSenderId: "592179684594",
  appId: "1:592179684594:web:263a84a6e2db6aa3455c6b",
  measurementId: "G-18MR8NKL8L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};