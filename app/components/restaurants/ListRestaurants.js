import React from 'react';
import {StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity} from "react-native";
import {Image} from 'react-native-elements';
import {size} from 'lodash';
import {colors} from "../../utils/colors";
import { useNavigation } from '@react-navigation/native';
export default function ListRestaurants(props) {

    const {restaurants, handleLoadMore, isLoading } = props;
    const navigation = useNavigation();
    return (
        <View>
            {size(restaurants) > 0 ? (
                    <FlatList
                        data={restaurants}
                        renderItem={
                        (restaurant) =>
                            <Restaurant navigation={navigation} restaurant={restaurant}/>
                    }
                        navigation={navigation}
                        ListFooterComponent={<FooterList isLoading={isLoading} />}
                        onEndReachedThreshold={0.5}
                        onEndReached={handleLoadMore}
                        keyExtractor={(item, index) => index.toString()}
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
    const {restaurant, navigation} = props;
    const {images, name, address, desc, index, id} = restaurant.item;
    const imageRestaurant = images[0];
    const showRestaurant = () => {
        navigation.navigate("restaurant", {
            id,
            name
        });
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
                <View style={styles.restaurantInfo}>
                    <Text style={styles.restaurantName}>{index} {name}</Text>
                    <Text style={styles.address}>{address}</Text>
                    <Text style={styles.address}>{desc}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
function FooterList (props) {
    const { isLoading } = props;
    if (isLoading) {
        return(
            <View style={styles.loadRestaurants}>
                <ActivityIndicator
                    size="large"
                    color={colors.primary}
                />
                <Text>Cargando restaurantes</Text>
            </View>
        )
    }
    else {
        return (
            <View style={styles.notFound}>
                <Text>No quedan restaurantes.</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    loadRestaurants: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    viewRestaurant: {
        flexDirection: 'row',
        margin: 10
    },
    image: {
        width: 80,
        height: 80
    },
    restaurantInfo: {
        paddingLeft: 6
    },
    restaurantName: {
       fontWeight: 'bold',
        fontSize: 18,
        color: 'grey'
    },
    address: {
        marginTop: 5
    },
    notFound: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center'
    }
});
