import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {colors} from "../../utils/colors";
import {firebaseApp} from '../../utils/firebase.js';
import firebase from 'firebase/app';
import 'firebase/firestore';
import ListRestaurants from "../../components/restaurants/ListRestaurants";
const db = firebase.firestore(firebaseApp);


export default function Restaurants(props) {
    const [user, setUser] = useState(null);
    const {navigation} = props;
    const [totalRestaurants, setTotalRestaurants] = useState(0);
    const [restaurants, setRestaurants] = useState([]);
    const [startRestaurants, setStartRestaurants] = useState(null);
    const limitRestaurants = 7;
    console.log(totalRestaurants);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            setUser(userInfo);
        });
    }, []);
    useEffect(() => {
        db.collection("restaurants").get().then((snap) => {
            setTotalRestaurants(snap.size);
        });
        const resultRestaurants = [];
        db.collection("restaurants")
            .orderBy("name")
            .limit(limitRestaurants)
            .get()
            .then(
            (response) => {
                setStartRestaurants(response.docs.length - 1);
                response.forEach((doc)=> {
                    const restaurant = doc.data();
                    restaurant.id = doc.id;
                    resultRestaurants.push(restaurant);
                });
                setRestaurants(resultRestaurants);
            });
    }, []);
    return (
        <View style={styles.body}>
            <ListRestaurants
                restaurants={restaurants}
            />
            <Text>Restaurants..</Text>
            {user && (
                <Icon
                    type="material-community"
                    name='plus'
                    color={colors.primary}
                    reverse={true}
                    containerStyle={styles.addButton}
                    onPress={() => {
                        navigation.navigate('addRestaurants')
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: colors.secondary
    },
    addButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        shadowColor: 'black',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.2
    }
});
