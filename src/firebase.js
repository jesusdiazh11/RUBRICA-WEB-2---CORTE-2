// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEYTrbGdkVM8Aid_oG8zSKJ7Fl74kgXZ0",
  authDomain: "crud-web2-c2.firebaseapp.com",
  projectId: "crud-web2-c2",
  storageBucket: "crud-web2-c2.appspot.com",
  messagingSenderId: "745120739034",
  appId: "1:745120739034:web:036c95aa46d4de9cc87fe3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
