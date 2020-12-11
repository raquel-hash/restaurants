import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView} from "react-native";
import {Card, Image, Rating, Icon} from "react-native-elements"

export default function ListTopRestaurants(props) {
    const {restaurants, navigation} = props;
    console.log(restaurants);
    return (
        <ScrollView>
            <FlatList
                data={restaurants}
                renderItem={(restaurant) => <Restaurant restaurant={restaurant} navigation={navigation}/>}
                keyExtractor={(restaurants, index) => index.toString()}
            />
        </ScrollView>
    )
}

function Restaurant(props) {
    const {restaurant, navigation} = props;
    const {name, rating, images, desc, id} = restaurant.item;
    const [iconColor, setIconColor] = useState('#000');

    useEffect(() => {
        if (restaurant.index === 0) {
            setIconColor('#efb819');
        } else if (restaurant.index === 1) {
            setIconColor('#e3e4e5');
        } else if (restaurant.index === 2) {
            setIconColor('#cd7f32');
        }
    }, []);
    const showRestaurant = () => {
        navigation.navigate("restaurant", {
            id,
            name
        });
    };
    return (
        <TouchableOpacity onPress={showRestaurant}>
            <Card containerStyle={styles.card}>
                <View style={styles.content}>
                    <Icon
                        type='material-community'
                        name="chess-queen"
                        color={iconColor}
                        size={30}
                        containerStyle={styles.icon}
                    />
                    <Image
                        style={styles.image}
                        resizeMode='cover'
                        source={
                            images[0] ? {uri: images[0]} : require('../../../assets/no-image.png')
                        }
                    />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}> {name}</Text>
                    <Rating readonly imageSize={20} startingValue={rating}/>
                </View>
                <Text style={styles.desc}>{desc}</Text>

            </Card>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 10,
    },
    content: {

    },
    image: {
        width:  '100%',
        height: 200
    },
    icon: {
        position: "absolute",
        top: -30
    },
    titleContainer:{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    desc: {
        textAlign: 'center',
        color: 'grey',
        marginTop: 1,


    }
});
