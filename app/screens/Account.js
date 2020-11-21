import React from 'react';
import { View, Text } from 'react-native';
import Login from "./Login";
import Register from "./Register";

export default function Account() {
    return(
        <View>
            <Text>Account</Text>
            <Login/>
        </View>
    );
}
