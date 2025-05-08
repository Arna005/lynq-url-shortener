import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGtzqPpUq66bwePQwf0OPEuvujPhMx-RE",
  authDomain: "lynq-7121d.firebaseapp.com",
  projectId: "lynq-7121d",
  storageBucket: "lynq-7121d.appspot.com",
  messagingSenderId: "763996853742",
  appId: "1:763996853742:web:c3c35c81311e2c55c62aff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth services
export const db = getFirestore(app);
export const auth = getAuth(app);