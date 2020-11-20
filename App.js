import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { firebaseApp } from "./app/utils/firebase.js";
import * as firebase from "firebase";
import Navigation  from "./app/navigations/navigation";
import LoginForm from "./app/components/LoginForm";
import RegisterForm from "./app/components/RegisterForm";
export default function App() {
  useEffect(
      () => {
        firebase.auth().onAuthStateChanged((user)=>{
          console.log(user);
        });
      }, []);
  return (
    <Navigation/>
     // <LoginForm/>
      //<RegisterForm/>
  );
}
