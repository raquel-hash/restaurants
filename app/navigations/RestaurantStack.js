import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Restaurants from '../screens/restaurants/Restaurants';
import TopRestaurants from "../screens/TopRestaurants";
import {colors} from "../utils/colors";
import AddRestaurant from "../screens/restaurants/AddRestaurant";


const Stack = createStackNavigator();
export default function RestaurantStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: colors.primary },
                headerTitleAlign: 'center'
            }}
        >
            <Stack.Screen
                name='restaurants'
                component={Restaurants}
                options={{ title: 'Restaurantes' }}
            />
            <Stack.Screen
                name='addRestaurants'
                component={AddRestaurant}
                options={{ title: 'Nuevo restaurante' }}
            />
        </Stack.Navigator>
    )

}
