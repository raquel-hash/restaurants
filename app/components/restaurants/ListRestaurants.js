import React from 'react';
import {StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity} from "react-native";
import {Image} from 'react-native-elements';
import {size} from 'lodash';
import {colors} from "../../utils/colors";

export default function ListRestaurants(props) {

    const {restaurants} = props;
    return (
        <View>
            {size(restaurants) > 0 ? (
                    <FlatList
                        data={restaurants} renderItem={
                        (restaurant) =>
                            <Restaurant restaurant={restaurant}/>
                    }
                    />
                ) :
                (
                    <View style={styles.loadRestaurants}>
                        <ActivityIndicator
                            size="large"
                            color={colors.primary}
                        />
                        <Text>Cargando restaurantes</Text>
                    </View>
                )
            }
        </View>
    )
};

function Restaurant(props) {
    const {restaurant} = props;
    const {images, name, address, desc} = restaurant.item;
    const imageRestaurant = images[0];
    console.log(props);
    const showRestaurant = () => {
        console.log('Ok')
    };
    return (
        <TouchableOpacity onPress={showRestaurant}>
            <View style={styles.viewRestaurant}>
                <View style={styles.image}>
                    <Image
                        resizeMode='cover'
                        placeholderContent={<ActivityIndicator size='large' color={colors.dark}/>}
                        source={
                            imageRestaurant
                                ? {uri: imageRestaurant}
                                : require("../../../assets/no-image.png")
                        }
                        style={styles.image}
                    />
                </View>
                <View>
                    <Text style={styles.restaurantName}>{name}</Text>
                    <Text style={styles.address}>{address}</Text>
                    <Text style={styles.desc}>{desc}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    loadRestaurants: {
        alignItems: 'center',
        marginTop: 200
    },
    viewRestaurant: {
        flexDirection: 'row',
        margin: 10
    },
    image: {
        width: 80,
        height: 80
    },
    restaurantName: {
       fontWeight: 'bold',
        color: 'grey'
    }
});
