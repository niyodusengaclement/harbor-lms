import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'; 

const firebaseConfig = {
  apiKey: "AIzaSyCn5GZnp5hP8_JIL8-mCgd8wKso8-r22nk",
  authDomain: "rems-522b6.firebaseapp.com",
  databaseURL: "https://rems-522b6.firebaseio.com",
  projectId: "rems-522b6",
  storageBucket: "rems-522b6.appspot.com",
  messagingSenderId: "488200847616",
  appId: "1:488200847616:web:584496b1323d24cd91b3e5",
  measurementId: "G-WC4VXMY1WK"
};
firebase.initializeApp(firebaseConfig);

export default firebase;