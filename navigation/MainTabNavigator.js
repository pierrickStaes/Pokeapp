import CapturePage from '../pages/CapturePage';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import PokedexPage from '../pages/PokedexPage';
import EquipePage from '../pages/EquipePage';
import React from 'react';
import {Image} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import DetailsPokemon from '../pages/DetailsPokemon';

const DetailPokemonNavigator = createStackNavigator(
    {
        Pokedex: {
            screen: PokedexPage
        },
        Detail:{
            screen: DetailsPokemon
        }
    },
    {
        initialRouteName: 'Pokedex',
        headerMode:'none'
    }
)

const tabNavigator = createMaterialBottomTabNavigator(
    {
        Equipe: {
            screen: EquipePage,
            navigationOptions: {
                tabBarLabel:'Equipe',
                tabBarIcon:({tintColor})=> (
                    <Image style={{height:25, width:25}} source={require('../assets/equipe.png')} />
                ),
                barStyle: {backgroundColor: '#bc270d'}
            }
        },
        Capture: {
            screen: CapturePage,
            navigationOptions: {
                tabBarLabel:'Capture',
                tabBarIcon:({tintColor})=> (
                    <Image style={{height:25, width:25}} source={require('../assets/capture.png')} />
                ),
                barStyle: {backgroundColor: '#bc270d'}
            }
        },
        Pokedex: {
            screen : DetailPokemonNavigator,
            navigationOptions: {
                tabBarLabel:'Pokedex',
                tabBarIcon:({tintColor})=> (
                    <Image style={{height:25, width:25}} source={require('../assets/pokedex.png')} />
                ),
                barStyle: {backgroundColor: '#bc270d'}
            }
        }
    },
    {
        initialRouteName: 'Equipe',
        activeColor:'white',
        inactiveColor:'#7cbac2',
        labelStyle: {textAlign: 'center'}
    }
);

export default tabNavigator;