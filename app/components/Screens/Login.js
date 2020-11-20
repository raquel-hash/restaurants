import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
//import Toast from "react-native-easy-toast";
import LoginForm from "../LoginForm";
import {colors} from "../../utils/colors";

export default function Login() {
    return (
        <ScrollView>
            <Image
                source={require("../../../assets/img/logo.png")}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={styles.container}>
                <LoginForm/>
                <CreateAccount />
            </View>
            <Divider style={styles.divider} />
        </ScrollView>
    );
}

function CreateAccount() {
    const navigation = useNavigation();

    return (
        <Text style={styles.textRegister}>
            ¿Aún no tienes una cuenta?{" "}
            <Text
                style={styles.btnRegister}
                onPress={() => navigation.navigate("register")}
            >
                Regístrate
            </Text>
        </Text>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20,
    },
    container: {
        marginRight: 40,
        marginLeft: 40,
    },
    textRegister: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    btnRegister: {
        color: colors.primary,
        fontWeight: "bold",
    },
    divider: {
        backgroundColor: colors.primary,
        margin: 40,
    },
});