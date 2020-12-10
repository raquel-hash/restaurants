import React, {useState, useEffect } from 'react';
import {ScrollView, StyleSheet, Text, View, Dimensions} from "react-native";
import {Rating, ListItem, Icon} from 'react-native-elements';
import Loading from "../Loading";
import CarouselImages from "../../components/Carousel";
import Map from "../../components/Map";
import {firebaseApp } from "../../utils/firebase";
import firebase from 'firebase';
import "firebase/firestore";
import { map } from 'lodash';
import {colors} from "../../utils/colors";
const db = firebase.firestore(firebaseApp);
export default function Restaurant(props) {
    const {navigation, route} = props;
    const {id, name} = route.params;
    const [restaurant, setRestaurant] = useState(null);
    const screenWidth = Dimensions.get('window').width;
    const [rating, setRating] = useState(0);
    navigation.setOptions({
        title: name
    });

    useEffect(() => {
        db.collection("restaurants")
            .doc(id)
            .get()
            .then((response)=> {
                const data = response.data();
                data.id = response.id;
                setRestaurant(data);
                setRating(data.rating);
            })
    }, []);
    if (!restaurant) return <Loading isVisible={true} text='Cargando'/>
    return(
        <ScrollView vertical style={styles.body}>
            <CarouselImages
                images={restaurant.images}
                height={250}
                width={screenWidth}
            />
            <Title
                name={restaurant.name}
                desc={restaurant.desc}
                rating={rating}
                schedule={restaurant.time}
            />
            <RestaurantInfo
                location={restaurant.location}
                name={restaurant.name}
                address={restaurant.address}
                schedule={restaurant.time}
            />
        </ScrollView>
    )
}
function Title(props) {
    const {name, desc, rating, schedule} = props;
    return (
        <View style={styles.title}>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.restaurantName}>{name}</Text>
                <Rating
                    style={styles.rating}
                    imageSize={25}
                    readonly={true}
                    startingValue={parseFloat(rating)}
                />
            </View>
            <Text style={styles.schedule}>
                Horarios de atencion:  {schedule}
            </Text>
            <Text style={styles.restaurantDesc}>
                {desc}
            </Text>

        </View>
    )
}
function RestaurantInfo(props) {
    const {location, name, address, schedule} = props;
    return(
        <View style={styles.info}>
            <Text style={styles.infoTitle}>
                Informacion sobre el restaurante
            </Text>
            <Map location={location} name={name} height={120}/>
            <ListItem
                style={styles.listItem}
                title={address}
                leftIcon={{
                    name: 'map-marker',
                    type: 'material-community',
                    color: colors.primary
                }}
            />
            <ListItem
                style={styles.listItem}
                title={schedule}
                leftIcon={{
                    name: 'clock',
                    type: 'material-community',
                    color: colors.primary
                }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        padding: 15
    },
    restaurantName: {
        fontSize: 20,
        fontWeight: "bold"
    },
    restaurantDesc: {

    },
    rating: {
        position: 'absolute',
        right: 0
    },
    schedule: {
        color: 'gray'
    },
    info: {
        margin: 15,
        marginTop: 25
    },
    infoTitle: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: "bold"
    },
    listItem: {
        borderBottomColor: colors.primary,
        borderBottomWidth: 1
    }
});
