import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../screens/Account';
import {colors} from "../utils/colors";
import Login from "../screens/Login";
import Register from "../screens/Register";

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
            <Stack.Screen
                name="login"
                component={Login}
                options={{ title: "Iniciar sesión" }}
            />
            <Stack.Screen
                name="register"
                component={Register}
                options={{ title: "Registro" }}
            />
        </Stack.Navigator>
    )

}
