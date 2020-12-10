import React, {useEffect, useState} from 'react';
import {Text, ScrollView, Image, StyleSheet, View, Alert} from 'react-native';
import {Icon, Avatar, Input, Button} from 'react-native-elements';
import {colors} from "../../utils/colors";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

import {map, size, filter} from 'lodash';
import MapView from 'react-native-maps';
import Modal from '../Modal';
import uuid from 'random-uuid-v4';

import {firebaseApp} from "../../utils/firebase";
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);

export default function AddRestaurantForm(props) {
    const {toastRef, setIsLoading, navigation} = props;
    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [restaurant, setRestaurant] = useState({
        name: null,
        address: null,
        desc: null,
        time: null
    });
    const [locationRestaurant, setLocationRestaurant] = useState(null);
    const [imagesSelected, setImagesSelected] = useState([]);
    const addRestaurant = () => {
        if (!restaurant.name || !restaurant.address || !restaurant.desc || !restaurant.time) {
            toastRef.current.show('Llena todos los campos',);
        } else if (size(imagesSelected) === 0) {
            toastRef.current.show('Selecciona al menos una foto');
        } else if (!locationRestaurant) {
            toastRef.current.show('Selecciona ubicacion');
        } else {
            setIsLoading(true);
            uploadImageStorage().then(response => {
                setIsLoading(false);
                db.collection('restaurants').add({
                    name: restaurant.name,
                    address: restaurant.address,
                    time: restaurant.time,
                    desc: restaurant.desc,
                    createdAt: Date.now(),
                    location: locationRestaurant,
                    images: response,
                    rating: 0,
                    ratingTotal: 0,
                    quantityVoting: 0,
                    createdBy: firebase.auth().currentUser.uid
                }).then(()=> {
                    setIsLoading(false);
                    toastRef.current.show('Restaurante registrado correctamente!');
                    navigation.navigate('restaurants');
                }).catch(()=> {
                    setIsLoading(false);
                    toastRef.current.show('Error');
                })
                ;
            });
        }
    };
    const uploadImageStorage = async () => {

        const imageBlob = [];

        await Promise.all(
            map(imagesSelected, async (image) => {
                const response = await fetch(image);
                const blob = await response.blob();
                const ref = firebase.storage().ref("restaurants").child(uuid());
                await ref.put(blob).then(async (result) => {
                    await firebase
                        .storage()
                        .ref(`restaurants/${result.metadata.name}`)
                        .getDownloadURL()
                        .then((photoUrl) => {
                            imageBlob.push(photoUrl);
                        });
                });

            })
        );
        return imageBlob;
    };
    return (
        <ScrollView style={styles.scrollView}>
            <ImageRestaurant imageRestaurant={imagesSelected[0]}/>
            <AddForm
                restaurant={restaurant}
                setRestaurant={setRestaurant}
                setIsVisibleMap={setIsVisibleMap}
                locationRestaurant={locationRestaurant}
            />
            <UploadImage
                toastRef={toastRef}
                setImagesSelected={setImagesSelected}
                imagesSelected={imagesSelected}
            />
            <Button
                title='Crear restaurante'
                titleStyle={styles.titleButton}
                onPress={addRestaurant}
                buttonStyle={styles.addButton}
            />
            <Map
                toastRef={toastRef}
                setLocationRestaurant={setLocationRestaurant}
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}/>
        </ScrollView>
    )

};

function AddForm(props) {
    const {restaurant, setIsVisibleMap, setRestaurant, locationRestaurant} = props;
    return (
        <View style={styles.viewForm}>
            <Input
                placeholder='Nombre del restaurante'
                containerStyle={styles.input}
                onChange={(e) => setRestaurant({...restaurant, name: e.nativeEvent.text})}
            />
            <Input
                placeholder='Direccion'
                containerStyle={styles.input}
                onChange={(e) => setRestaurant({...restaurant, address: e.nativeEvent.text})}
                rightIcon={{
                    type: 'material-community',
                    name: 'google-maps',
                    color: locationRestaurant ? '#00a680' : '#c2c2c2',
                    onPress: () => setIsVisibleMap(true)
                }}
            />
            <Input
                placeholder='Horarios de atencion'
                containerStyle={styles.input}
                onChange={(e) => setRestaurant({...restaurant, time: e.nativeEvent.text})}
            />
            <Input
                placeholder='Descripcion'
                multiline={true}
                containerStyle={styles.textArea}
                onChange={(e) => setRestaurant({...restaurant, desc: e.nativeEvent.text})}
            />
        </View>
    )
}

function Map(props) {
    const {isVisibleMap, setIsVisibleMap, setLocationRestaurant, toastRef} = props;
    const [location, setLocation] = useState(null);
    useEffect(() => {
        (async () => {
            const resultPermissions = await Permissions.askAsync(
                Permissions.LOCATION
            );
            const statusPermissions = resultPermissions.permissions.location.status;
            if (statusPermissions !== 'granted') {
                toastRef.current.show(
                    'Tienes que aceptar los permisos', 3000
                );
            } else {
                const location = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                });

            }
        })()
    }, []);
    const confirmLocation = () => {
        setLocationRestaurant(location);
        toastRef.current.show('Localizacion guardad correctamente');
        setIsVisibleMap(false);
    };
    return (
        <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <View>
                {location && (
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={location}
                        showsUserLocation={true}
                        onRegionChange={(region) => setLocation(region)}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude
                            }}
                            draggable={true}
                        />
                    </MapView>
                )}
                <View style={styles.viewMapButton}>
                    <Button
                        title='Guardar Ubicacion'
                        buttonStyle={{
                            backgroundColor: colors.dark
                        }}
                        onPress={() => confirmLocation()}
                    />
                    <Button
                        title='Cancelar'
                        containerStyle={styles.cancelButton}
                        buttonStyle={{
                            backgroundColor: '#a60b0d'
                        }}
                        onPress={() => setIsVisibleMap(false)}
                    />
                </View>
            </View>
        </Modal>
    );
}

function UploadImage(props) {
    const {toastRef, setImagesSelected, imagesSelected} = props;
    const imageSelect = async () => {
        const resultPermissions = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );
        if (resultPermissions === 'denied') {
            toastRef.current.show(
                'Porfavor acepta los permisos',
                3000
            );
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });
            if (result.cancelled) {
                toastRef.current.show(
                    'No seleccionaste ninguna imagen',
                    300,
                    true
                )
            } else {
                setImagesSelected([...imagesSelected, result.uri]);
            }
        }
    };
    const removeImage = (image) => {
        Alert.alert('Eliminar imagen', 'Estas seguro que quieres eliminar la imagen?', [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Eliminar',
                    onPress: () => {
                        const test = filter(
                            imagesSelected,
                            (imageUrl) => imageUrl !== image
                        );
                        setImagesSelected(test);
                    }
                }
            ],
            {cancelable: false}
        );
    };
    return (
        <View style={styles.viewImages}>
            {size(imagesSelected) < 4 && (
                <View style={styles.icon}>
                    <Icon
                        style={{
                            borderWidth: 1,
                            width: '100%',
                            height: '100%',
                            justifyContent: "center"
                        }}
                        onPress={imageSelect}
                        type="material-community"
                        name='camera'
                        color='#7a7a7a'
                    />
                </View>
            )}
            {map(imagesSelected, (imageRestaurant, index) => (
                <View style={styles.icon}>
                    <Avatar
                        key={index}
                        style={styles.avatar}
                        source={{uri: imageRestaurant}}
                        onPress={() => removeImage(imageRestaurant)}
                    />
                </View>
            ))}
        </View>
    )
}

function ImageRestaurant(props) {
    const {imageRestaurant} = props;
    return (
        <View>
            <Image
                source={
                    imageRestaurant
                        ? {uri: imageRestaurant}
                        : require("../../../assets/no-image.png")
                }
                style={{width: '100%', height: 200}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        height: '100%'
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10
    },
    textArea: {
        height: 100,
        width: '100%',
        padding: 0,
        margin: 0,
    },
    input: {},
    addButton: {
        borderWidth: 2,
        backgroundColor: colors.primary,
        borderColor: colors.dark,
        margin: 20
    },
    titleButton: {
        color: colors.secondary
    },
    viewImages: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
    },
    icon: {
        justifyContent: 'center',
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: '#e3e3e3'
    },
    avatar: {
        width: '100%',
        height: '100%'
    },
    viewPhoto: {
        alignItems: 'center',
        height: 200,
        marginBottom: 20
    },
    mapStyle: {
        width: '100%',
        height: 450
    },
    viewMapButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    cancelButton: {
        paddingLeft: 5
    }
});
