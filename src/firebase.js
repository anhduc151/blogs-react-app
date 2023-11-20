// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0qUACYYeJad5Udjo-AsRTqf3gmV-ue2k",
  authDomain: "blogs-1cff6.firebaseapp.com",
  projectId: "blogs-1cff6",
  storageBucket: "blogs-1cff6.appspot.com",
  messagingSenderId: "964124303782",
  appId: "1:964124303782:web:a0e613627aa3618ebbef67",
  measurementId: "G-6ZGPWZY7K3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
// const firestore = getFirestore(app);

export { app, auth, storage };
