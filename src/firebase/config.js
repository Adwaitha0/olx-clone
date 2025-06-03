import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFch90V0edDZ7gKEz93_ynTm0OKPcB94Y",
  authDomain: "olx-clone-569c6.firebaseapp.com",
  projectId: "olx-clone-569c6",
  storageBucket: "olx-clone-569c6.firebasestorage.app",
  messagingSenderId: "1075784610574",
  appId: "1:1075784610574:web:a2a29d607eaf8be3bb9d5f",
  measurementId: "G-SJB1Q0BFR1"
};

export default firebase.initializeApp(firebaseConfig)