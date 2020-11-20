import React from 'react';
import { View, Text } from 'react-native';
import Login from "./Screens/Login";
import Register from "./Screens/Register";

export default function Account() {
    return(
        <View>
            <Text>Account</Text>
            <Login/>
        </View>
    );
}
