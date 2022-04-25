import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDEwj644bKD8YD1drVl4tlqSM8iZY5Q-Ug",
  authDomain: "motorq-6295e.firebaseapp.com",
  projectId: "motorq-6295e",
  storageBucket: "motorq-6295e.appspot.com",
  messagingSenderId: "374210490469",
  appId: "1:374210490469:web:d11f291ebb2a6631b4968c"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;