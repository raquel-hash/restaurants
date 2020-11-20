import React, { useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
//import Toast from "react-native-easy-toast";
import RegisterForm from "../RegisterForm";

export default function Register() {

    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../../assets/img/logo.png")}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={styles.viewForm}>
                <RegisterForm/>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20,
    },
    viewForm: {
        marginRight: 40,
        marginLeft: 40,
    },
});