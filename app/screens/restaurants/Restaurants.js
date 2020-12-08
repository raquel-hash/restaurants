import React, {useState, useEffect, useCallback} from 'react'
import {useFocusEffect} from '@react-navigation/native';
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
    const [isLoading, setIsLoading] = useState(false);
    const limitRestaurants = 8;
    console.log(totalRestaurants);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            setUser(userInfo);
        });
    }, []);

    useFocusEffect(
        useCallback(() => {
            db.collection("restaurants").get().then((snap) => {
                setTotalRestaurants(snap.size);
            });
            const resultRestaurants = [];
            db.collection("restaurants")
                .orderBy("createdAt", "desc")
                .limit(limitRestaurants)
                .get()
                .then((response) => {
                    setStartRestaurants(response.docs[response.docs.length - 1]);

                    response.forEach((doc)=> {
                        const restaurant = doc.data();
                        restaurant.id = doc.id;
                        resultRestaurants.push(restaurant);
                    });
                    setRestaurants(resultRestaurants);
                });
        }, [])
    );
    const handleLoadMore = () => {
        const resultRestaurants = [];
        console.log(restaurants.length, totalRestaurants);
        restaurants.length < totalRestaurants && setIsLoading(true);
        db.collection("restaurants")
            .orderBy("createdAt", "desc")
            .startAfter(startRestaurants.data().createdAt)
            .limit(limitRestaurants)
            .get()
            .then( (response) => {
                console.log("REsponse", response.docs);
                console.log(response.docs.length);
                if (response.docs.length > 0){
                    console.log("Final restaurant",response.docs[response.docs.length - 1]);
                    setStartRestaurants(response.docs[response.docs.length - 1]);
                } else {
                    setIsLoading(false);
                }
                response.forEach((doc) => {
                    const restaurant = doc.data();
                    restaurant.id = doc.id;
                    resultRestaurants.push(restaurant);
                });
                setRestaurants([...restaurants, ...resultRestaurants]);
            });
    };
    return (
        <View style={styles.body}>
            <ListRestaurants
                restaurants={restaurants}
                handleLoadMore={handleLoadMore}
                isLoading={isLoading}
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
