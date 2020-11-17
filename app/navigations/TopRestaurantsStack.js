import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TopRestaurants from '../components/TopRestaurants';
import {colors} from "../utils/colors";

const Stack = createStackNavigator();
export default function FavoritesStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: colors.primary },
                headerTitleAlign: 'center'
            }}
        >
            <Stack.Screen
                name='topRestaurants'
                component={TopRestaurants}
                options={{ title: 'Mejores restaurantes' }}
            />
        </Stack.Navigator>
    )

}
