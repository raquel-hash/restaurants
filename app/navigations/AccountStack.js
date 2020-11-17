import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../components/Account';
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
                name='account'
                component={Account}
                options={{ title: 'Mi cuenta' }}
            />
        </Stack.Navigator>
    )

}
