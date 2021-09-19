import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC0yKBh2obBKpW1oUvmUFxF4ejlazNECjg",
    authDomain: "react-b00db.firebaseapp.com",
    projectId: "react-b00db",
    storageBucket: "react-b00db.appspot.com",
    messagingSenderId: "59987297800",
    appId: "1:59987297800:web:626ba97a7f6884e787b3bd"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export{
    db, googleAuthProvider, firebase
}