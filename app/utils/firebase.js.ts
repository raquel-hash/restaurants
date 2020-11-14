import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBsl5I8OJ4-HTKUuNFdy0Kmioq9C63eNjE",
    authDomain: "restaurants-vinto.firebaseapp.com",
    databaseURL: "https://restaurants-vinto.firebaseio.com",
    projectId: "restaurants-vinto",
    storageBucket: "restaurants-vinto.appspot.com",
    messagingSenderId: "968807929642",
    appId: "1:968807929642:web:24ca2b771ad7496c4f7053",
    measurementId: "G-46X4EKDB3C"
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
