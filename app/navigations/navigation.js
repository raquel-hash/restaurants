import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import RestaurantStack from "./RestaurantStack";
import FavoritesStack from './FavoritesStack';
import AccountStack from "./AccountStack";
import TopRestaurantsStack from "./TopRestaurantsStack";
const Tab = createBottomTabNavigator();
export default function Navigation() {
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name='restaurants'
                    component={RestaurantStack}
                    options={{title:'Restaurantes'}}
                />
                <Tab.Screen
                    name='favorites'
                    component={FavoritesStack}
                    options={{title:'Favoritos'}}
                />
                <Tab.Screen
                    name='topRestaurants'
                    component={TopRestaurantsStack}
                    options={{title:'Top 5'}}
                />
                <Tab.Screen
                    name='account'
                    component={AccountStack}
                    options={{title:'Mi cuenta'}}
                />

            </Tab.Navigator>
        </NavigationContainer>
    )

}
