import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDccDOxVKuHBCWOVqJL6HQV1OoupQzgM1M",
  authDomain: "recipeapp-e6533.firebaseapp.com",
  databaseURL: "https://recipeapp-e6533.firebaseio.com",
  projectId: "recipeapp-e6533",
  storageBucket: "recipeapp-e6533.appspot.com",
  messagingSenderId: "629117801354",
  appId: "1:629117801354:web:8aa9f8384b459d217dae73"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();
