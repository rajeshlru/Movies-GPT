// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4Ce7X2WkrWbgnEf_I5aAhVQjeavRmwmM",
  authDomain: "netflixgpt-d29.firebaseapp.com",
  projectId: "netflixgpt-d29",
  storageBucket: "netflixgpt-d29.firebasestorage.app",
  messagingSenderId: "908733230664",
  appId: "1:908733230664:web:5fbac3908253ff8b2eb27d",
  measurementId: "G-9VKQ2YNC8X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
