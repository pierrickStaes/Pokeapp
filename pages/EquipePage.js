import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Button,TouchableOpacity,AsyncStorage, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationEvents } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';
import CityFavoris from '../components/CityFavoris';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class EquipePage extends React.Component{

    /*static navigationOptions = ({navigation}) => {
        return {
            title: 'Favoris',
            headerRight: (
                <Icon style={{marginTop:8, marginRight:20}} name="plus-circle" 
                    size={30} color="white" onPress={() => FavoritesPage.onPressFav(navigation)}/>
            )
        }
    };

    static onPressFav(navigation) {
        if (FavoritesPage.count < 15){
            navigation.push('AddFavorites')
        }
        else{
            alert("Vous ne pouvez pas avoir plus de 15 villes favorites")
        }
    }

    static  count = 0 

    state = { cities: [], refreshing: true }

    onRefresh(){
        this.setState({refreshing:true})
        this.props.actions.loadCities();
        this.setState({refreshing:false})
}

    deleteCity(cityname){
        let tab = [...this.state.cities];
        tab.splice(tab.findIndex(e => e.name === cityname), 1);
        AsyncStorage.setItem('city', JSON.stringify(tab)).then(()=>{
            this.setState({cities: tab})
        })
        FavoritesPage.count -= 1;
    }

    suppFav(){
        AsyncStorage.removeItem('city').then(() => {
            this.setState({
                cities : []
            })
            this.onRefresh();
            FavoritesPage.count = 0;
        });

    }*/

    componentDidMount(){
    }
      
    render(){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text>Equipe de Pokemon</Text>
            </View>
        );
    }
}

/*const mapActionsToProps = (payload) => ({
    actions : {
        loadCities: bindActionCreators(init,payload)
    }
});

const mapStateToProps = state => {
    return { cities: state.citiesFav.cities };
};*/

export default EquipePage;