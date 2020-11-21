import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Restaurants from '../screens/Restaurants';
import TopRestaurants from "../screens/TopRestaurants";
import {colors} from "../utils/colors";

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
        </Stack.Navigator>
    )

}
