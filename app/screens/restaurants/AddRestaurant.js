import React, {useState, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-easy-toast';
import AddRestaurantForm from "../../components/restaurants/AddRestaurantForm";
import Loading from "../Loading";
export default function AddRestaurantStack(props) {
    const {navigation} = props;
    const [isLoading, setIsLoading] = useState(false);
    const toastRef = useRef();

    return(
        <View>
            <AddRestaurantForm
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}
            />
            <Toast ref={toastRef} position='center' opacity={0.9}/>
            <Loading isVisible={isLoading} text="Cargando" />
        </View>
    )
}
const styles = StyleSheet.create({

});
