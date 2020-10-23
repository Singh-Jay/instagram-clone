import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBL6ZWNPeu-qR0KwBoEKYRMgLCotepHvx8",
  authDomain: "instagram-clone-fae74.firebaseapp.com",
  databaseURL: "https://instagram-clone-fae74.firebaseio.com",
  projectId: "instagram-clone-fae74",
  storageBucket: "instagram-clone-fae74.appspot.com",
  messagingSenderId: "890821066563",
  appId: "1:890821066563:web:5c0057432c2e8c427639f6",
  measurementId: "G-1WLBSZBGQX",
};

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const storage = firebase.storage();

// export { db, auth, storage };
