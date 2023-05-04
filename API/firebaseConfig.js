import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const app = initializeApp({
  apiKey: "AIzaSyDyIb_t17-Ra9LvL0igqTjQk-L6dXFRS1M",
  authDomain: "noxlex-11c42.firebaseapp.com",
  projectId: "noxlex-11c42",
  storageBucket: "noxlex-11c42.appspot.com",
  messagingSenderId: "184674750864",
  appId: "1:184674750864:web:a88d62b7a47c497d9d2315",
  measurementId: "G-28KXB46PGP",
});

export const auth = getAuth(app);
