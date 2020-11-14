import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Favorites from '../components/Favorites';

const Stack = createStackNavigator();
export default function FavoritesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='favorites'
                component={Favorites}
                options={{ title: 'Mis favoritos' }}
            />
        </Stack.Navigator>
    )

}
