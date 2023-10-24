// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjwC-4lq_C9ACwrrYGJaD2IJuz7c09WpM",
  authDomain: "bbank-ac2b5.firebaseapp.com",
  projectId: "bbank-ac2b5",
  storageBucket: "bbank-ac2b5.appspot.com",
  messagingSenderId: "827841112404",
  appId: "1:827841112404:web:ba500943545c80d0c5c0c1",
  measurementId: "G-7EFDZ6FMJL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);