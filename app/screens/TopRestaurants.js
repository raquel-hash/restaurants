import React, {useState, useEffect, useRef} from 'react';
import { View, Text} from "react-native";

import ListTopRestaurants from "../components/Ranking/ListTopRestaurants";
import Toast from "react-native-easy-toast";
import {firebaseApp} from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function TopRestaurants(props) {
    const { navigation } = props;
    const [restaurants, setRestaurants] = useState([]);

    const toastRef = useRef();
    useEffect(()=> {
        db.collection("restaurants")
            .orderBy("rating", "desc")
            .limit(5)
            .get()
            .then((response)=> {
                let restaurants = [];
                response.forEach((doc) => {
                    let data = doc.data();
                    data.id = doc.id;
                    restaurants.push(data);
                });
                setRestaurants(restaurants);
            });
    }, []);
    return(
        <View>
            <ListTopRestaurants restaurants={restaurants} navigation={navigation}/>
            <Toast ref={toastRef} position={"center"} opacity={0.9}/>

        </View>
    )
}
