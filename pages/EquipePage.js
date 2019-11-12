import React from 'react';
import { StyleSheet, ImageBackground , View, Image, Dimensions, FlatList, Text,TouchableOpacity,AsyncStorage, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationEvents } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';
import CityFavoris from '../components/CityFavoris';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initPokedex } from '../actions/PokedexActions';
import { initFav } from '../actions/PokemonActions';

class EquipePage extends React.Component{

    state = {
        LienPokimage: null,
        refreshing:true/*{
            pokemon1: ['https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/196.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/305.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/500.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/600.png']
        }*/
    }
    onRefresh(){
        this.setState({refreshing:true})
        this.props.actions.initPokedex()
        this.props.actions.initFav()
        /*this.props.pokemonServ.getPokemonDataNom('espeon').then((resp) => {
            this.setState({LienPokimage: [resp.data.sprites.front_default]})
        })*/
        this.setState({refreshing:false})
    }

    componentDidMount(){
        this.onRefresh();
    }
      
    render(){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <NavigationEvents onDidFocus={() => this.onRefresh()} />
                <ImageBackground source={require('../assets/plaineDecor.png')} style={{width: '100%', height: '100%'}}>
                    <FlatList 
                        data={this.props.pokemonFav}
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

const mapActionsToProps = (payload) => ({
    actions: {
        initPokedex: bindActionCreators(initPokedex, payload),
        initFav: bindActionCreators(initFav,payload)
    }
});

const mapStateToProps = state => {
    return { pokemonServ: state.pokemonService.Pokeserv, pokemonFav: state.pokemonFav.pokemonFav };
};

export default connect(mapStateToProps,mapActionsToProps)(EquipePage);