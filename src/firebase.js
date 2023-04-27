import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDjjgWjKek7_LY6xyHDZD3YscDinjkhji0",
    authDomain: "whatsapp-986.firebaseapp.com",
    projectId: "whatsapp-986",
    storageBucket: "whatsapp-986.appspot.com",
    messagingSenderId: "45717742477",
    appId: "1:45717742477:web:0b2966b7d6e7dc1379d3c4"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;