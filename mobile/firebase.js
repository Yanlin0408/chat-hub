
import * as firebase from "firebase";
//import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth";

//import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDLBZ3rIu16XdZBnngsMcMJgIcGSeB6MMs",
    authDomain: "chathub-5ce83.firebaseapp.com",
    projectId: "chathub-5ce83",
    storageBucket: "chathub-5ce83.appspot.com",
    messagingSenderId: "887310238287",
    appId: "1:887310238287:web:88bc7a6a89f6838632603a"
  };

//initializeApp(firebaseConfig);
let app;

if (firebase.apps.length === 0) {    // length of undefined
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();  //app.firebase() is not a function
const auth = firebase.auth();

export { db, auth };

