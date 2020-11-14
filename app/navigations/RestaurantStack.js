import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Restaurants from '../components/Restaurants';
import TopRestaurants from "../components/TopRestaurants";

const Stack = createStackNavigator();
export default function RestaurantStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='restaurants'
                component={Restaurants}
                options={{ title: 'Restaurantes' }}
            />
        </Stack.Navigator>
    )

}
