import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDjwtvMALocxZHm2xFUTqHKl1Kiz52griQ",
  authDomain: "todo-b5b95.firebaseapp.com",
  databaseURL: "https://todo-b5b95.firebaseio.com",
  projectId: "todo-b5b95",
  storageBucket: "todo-b5b95.appspot.com",
  messagingSenderId: "136916565712",
  appId: "1:136916565712:web:abae842a8d7223766be8d5",
  measurementId: "G-ERQJT47T9G"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();
