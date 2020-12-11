import React, {useState, useEffect, useRef } from 'react';
import {ScrollView, StyleSheet, Text, View, Dimensions} from "react-native";
import {Rating, ListItem, Icon} from 'react-native-elements';
import Loading from "../../components/Loading";
import CarouselImages from "../../components/Carousel";
import Map from "../../components/Map";
import {firebaseApp } from "../../utils/firebase";
import firebase from 'firebase';
import "firebase/firestore";
import Toast from "react-native-easy-toast";
import { map } from 'lodash';
import {colors} from "../../utils/colors";
const db = firebase.firestore(firebaseApp);
export default function Restaurant(props) {
    const {navigation, route} = props;
    const {id, name} = route.params;
    const [restaurant, setRestaurant] = useState(null);
    const screenWidth = Dimensions.get('window').width;
    const [rating, setRating] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [userLogged, setUserLogged] = useState(false);
    const toastRef = useRef();
    navigation.setOptions({
        title: name
    });

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false);
      });

    useEffect(() => {
        db.collection("restaurants")
            .doc(id)
            .get()
            .then((response)=> {
                const data = response.data();
                data.id = response.id;
                setRestaurant(data);
                setRating(data.rating);
            })
    }, []);

    useEffect(() => {
        if (userLogged && restaurant) {
          db.collection("favorites")
            .where("idRestaurant", "==", restaurant.id)
            .where("idUser", "==", firebase.auth().currentUser.uid)
            .get()
            .then((response) => {
              if (response.docs.length === 1) {
                setIsFavorite(true);
              }
            });
        }
      }, [userLogged, restaurant]);

    const addFavorite = () => {
        if (!userLogged) {
          toastRef.current.show(
            "Para usar el sistema de favoritos tienes que estar logeado"
          );
        } else {
          const payload = {
            idUser: firebase.auth().currentUser.uid,
            idRestaurant: restaurant.id,
          };
          db.collection("favorites")
            .add(payload)
            .then(() => {
              setIsFavorite(true);
              toastRef.current.show("Restaurante añadido a favoritos");
            })
            .catch(() => {
              toastRef.current.show("Error al añadir el restaurnate a favoritos");
            });
        }
      };
    
      const removeFavorite = () => {
        db.collection("favorites")
          .where("idRestaurant", "==", restaurant.id)
          .where("idUser", "==", firebase.auth().currentUser.uid)
          .get()
          .then((response) => {
            response.forEach((doc) => {
              const idFavorite = doc.id;
              db.collection("favorites")
                .doc(idFavorite)
                .delete()
                .then(() => {
                  setIsFavorite(false);
                  toastRef.current.show("Restaurante eliminado de favoritos");
                })
                .catch(() => {
                  toastRef.current.show(
                    "Error al eliminar el restaurante de favoritos"
                  );
                });
            });
          });
      };
    if (!restaurant) return <Loading isVisible={true} text='Cargando'/>
    return(
        <ScrollView vertical style={styles.body}>
             <View style={styles.viewFavorite}>
        <Icon
          type="material-community"
          name={isFavorite ? "heart" : "heart-outline"}
          onPress={isFavorite ? removeFavorite : addFavorite}
          color={isFavorite ? "#f00" : "#000"}
          size={35}
          underlayColor="transparent"
        />
      </View>
            <CarouselImages
                images={restaurant.images}
                height={250}
                width={screenWidth}
            />
            <Title
                name={restaurant.name}
                desc={restaurant.desc}
                rating={rating}
                schedule={restaurant.time}
            />
            <RestaurantInfo
                location={restaurant.location}
                name={restaurant.name}
                address={restaurant.address}
                schedule={restaurant.time}
            />
         <Toast ref={toastRef} position="center" opacity={0.9} />
        </ScrollView>
    )
}
function Title(props) {
    const {name, desc, rating, schedule} = props;
    return (
        <View style={styles.title}>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.restaurantName}>{name}</Text>
                <Rating
                    style={styles.rating}
                    imageSize={25}
                    readonly={true}
                    startingValue={parseFloat(rating)}
                />
            </View>
            <Text style={styles.schedule}>
                Horarios de atencion:  {schedule}
            </Text>
            <Text style={styles.restaurantDesc}>
                {desc}
            </Text>

        </View>
    )
}
function RestaurantInfo(props) {
    const {location, name, address, schedule} = props;
    return(
        <View style={styles.info}>
            <Text style={styles.infoTitle}>
                Informacion sobre el restaurante
            </Text>
            <Map location={location} name={name} height={120}/>
            <ListItem
                style={styles.listItem}
                title={address}
                leftIcon={{
                    name: 'map-marker',
                    type: 'material-community',
                    color: colors.primary
                }}
            />
            <ListItem
                style={styles.listItem}
                title={schedule}
                leftIcon={{
                    name: 'clock',
                    type: 'material-community',
                    color: colors.primary
                }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        padding: 15
    },
    restaurantName: {
        fontSize: 20,
        fontWeight: "bold"
    },
    restaurantDesc: {

    },
    rating: {
        position: 'absolute',
        right: 0
    },
    schedule: {
        color: 'gray'
    },
    info: {
        margin: 15,
        marginTop: 25
    },
    infoTitle: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: "bold"
    },
    listItem: {
        borderBottomColor: colors.primary,
        borderBottomWidth: 1
    },
    viewFavorite: {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 2,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 100,
        padding: 5,
        paddingLeft: 15,
      },
});
