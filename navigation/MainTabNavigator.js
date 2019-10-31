import CapturePage from '../pages/CapturePage';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import PokedexPage from '../pages/PokedexPage';
import EquipePage from '../pages/EquipePage';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

/*const FavoritesNavigator = createStackNavigator(
    {
        FavoritesPage: {
            screen: FavoritesPage
        },
        AddFavorites:{
            screen: AddFavoritesPage
        }
    },
    {
        initialRouteName: 'FavoritesPage',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#7cbac2',
            },
            headerTintColor: 'white'
        }
    }
)*/

const tabNavigator = createMaterialBottomTabNavigator(
    {
        Equipe: {
            screen: EquipePage,
            navigationOptions: {
                tabBarLabel:'Equipe',
                tabBarIcon:({tintColor})=> (
                    <Icon style={[{color: tintColor}]} size ={25} name ={'ios-home'} />
                ),
                barStyle: {backgroundColor: '#496c89'}
            }
        },
        Capture: {
            screen: CapturePage,
            navigationOptions: {
                tabBarLabel:'Capture',
                tabBarIcon:({tintColor})=> (
                    <Icon style={[{color: tintColor}]} size ={25} name ={'ios-star'} />
                ),
                barStyle: {backgroundColor: '#496c89'}
            }
        },
        Pokedex: {
            screen : PokedexPage,
            navigationOptions: {
                tabBarLabel:'Pokedex',
                tabBarIcon:({tintColor})=> (
                    <Icon style={[{color: tintColor}]} size ={25} name ={'ios-settings'} />
                ),
                barStyle: {backgroundColor: '#496c89'}
            }
        }
    },
    {
        initialRouteName: 'Equipe',
        activeColor:'#7cbac2',
        inactiveColor:'#3684c5',
        labelStyle: {textAlign: 'center'}
    }
);

export default tabNavigator;