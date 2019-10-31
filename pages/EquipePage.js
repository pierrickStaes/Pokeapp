import React from 'react';
import { StyleSheet, ImageBackground , View, Image, Dimensions, FlatList, Button,TouchableOpacity,AsyncStorage, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationEvents } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';
import CityFavoris from '../components/CityFavoris';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PokemonService from '../services/PokemonService';

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

    state = {
        LienPokimage: {
            pokemon1: ['https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/196.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/305.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/500.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/600.png']
        }
    }

    pokeServ = new PokemonService();

    componentDidMount(){
        /*this.pokeServ.getPokemonDataNom('espeon').then((resp) => {
            console.log(resp.data.sprites.front_default)
            this.setState({LienPokimage:resp.data.sprites.front_default})
        })*/
    }
      
    render(){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ImageBackground source={require('../assets/plaineDecor.png')} style={{width: '100%', height: '100%'}}>
                    <FlatList 
                        data={this.state.LienPokimage.pokemon1}
                        renderItem={({ item }) => 
                            <View style={styles.card}>
                                <Image style={{width: 150, height: 150}} source={{uri: `${item}`}}/>
                            </View>
                        }
                        numColumns={2}
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ImageBackground>
            </View>
        );
    }
}
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    listView: {
        flexDirection: 'row',
        flexWrap: 'wrap'
      },
    card: {
        width: (width / 2) - 15,
        height: (height / 3) - 30,
        marginLeft: 10,
        marginTop: 10,
        justifyContent:'center', 
        alignItems:'center'
    }
})

/*const mapActionsToProps = (payload) => ({
    actions : {
        loadCities: bindActionCreators(init,payload)
    }
});

const mapStateToProps = state => {
    return { cities: state.citiesFav.cities };
};*/

export default EquipePage;