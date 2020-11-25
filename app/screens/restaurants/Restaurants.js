import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from "../../utils/colors";
import { firebaseApp } from '../../utils/firebase.js';
import firebase from 'firebase/app';

export default function Restaurants(props) {
    const [ user, setUser ]= useState(null);
    const {navigation} = props;

    useEffect(()=> {
        firebase.auth().onAuthStateChanged((userInfo)=> {
            setUser(userInfo);
        });
    }, []);

    return (
        <View style={styles.body}>
            <Text>Restaurants..</Text>
            {user && (
                <Icon
                    type="material-community"
                    name='plus'
                    color={colors.primary}
                    reverse={true}
                    containerStyle={styles.addButton}
                    onPress={() => {
                        navigation.navigate('addRestaurants')
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
   body: {
       flex: 1,
       backgroundColor: colors.secondary
   },
    addButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        shadowColor: 'black',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.2
    }
});
