import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import {colors} from '../utils/colors';

import RestaurantStack from "./RestaurantStack";
import FavoritesStack from './FavoritesStack';
import AccountStack from "./AccountStack";
import TopRestaurantsStack from "./TopRestaurantsStack";

const Tab = createBottomTabNavigator();
export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                header={{
                    style: {
                        backgroundColor: 'red'
                    }
                }}
                initialRouteName='restaurants'
                tabBarOptions={{
                    inactiveTintColor: colors.secondary,
                    activeTintColor: colors.secondary,
                    headerTintColor: colors.primary,
                    style: {
                        backgroundColor: colors.primary,
                    }
                }}

                screenOptions={({route}) => ({
                    tabBarIcon: ({color}) => screenOptions(route, color)
                })}
            >
                <Tab.Screen
                    name='restaurants'
                    component={RestaurantStack}
                    options={{title: 'Restaurantes'}}
                />
                <Tab.Screen
                    name='favorites'
                    component={FavoritesStack}
                    options={{title: 'Favoritos'}}
                />
                <Tab.Screen
                    name='topRestaurants'
                    component={TopRestaurantsStack}
                    options={{title: 'Top 5'}}
                />
                <Tab.Screen
                    name='account'
                    component={AccountStack}
                    options={{title: 'Mi cuenta'}}
                />

            </Tab.Navigator>
        </NavigationContainer>
    )

}

function screenOptions(route, color) {
    let iconName;
    switch (route.name) {
        case 'restaurants':
            iconName = 'store';
            break;
        case 'favorites':
            iconName = 'heart';
            break;
        case 'topRestaurants':
            iconName = 'star';
            break;
        case 'account':
            iconName = 'account';
            break;
        default:
            break;
    }
    return (
        <Icon type='material-community' name={iconName} size={32} color={color}/>
    )
}
