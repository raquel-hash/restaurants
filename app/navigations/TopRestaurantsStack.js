import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TopRestaurants from '../components/TopRestaurants';

const Stack = createStackNavigator();
export default function FavoritesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='topRestaurants'
                component={TopRestaurants}
                options={{ title: 'Mejores restaurantes' }}
            />
        </Stack.Navigator>
    )

}
