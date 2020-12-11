import firebase from "firebase"; 

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAs_KUP-RluR66y4aYcI-XNCypd7bzfMJc",
    authDomain: "raffleeverything-43792.firebaseapp.com",
    projectId: "raffleeverything-43792",
    storageBucket: "raffleeverything-43792.appspot.com",
    messagingSenderId: "220786368676",
    appId: "1:220786368676:web:11f454df85e9f125fb4631",
    measurementId: "G-8ZNN541TFV"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage }
