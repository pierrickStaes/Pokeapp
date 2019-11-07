import React from 'react';
import { StyleSheet, ImageBackground , View, Image, Dimensions, FlatList, Text,TouchableOpacity,AsyncStorage, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { initPokedex } from '../actions/PokedexActions';

class PokedexPage extends React.Component{

    state = {
        LienPokimage: [],
        refreshing:true/*{
            pokemon1: ['https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/196.png',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/305.png',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/500.png',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png']
        }*/
    }
    onRefresh(){
        this.setState({refreshing:true})
        this.props.actions.initPokedex()
        /*this.props.pokemonServ.getPokemonDataNom('espeon').then((resp) => {
            this.setState({LienPokimage: [resp.data.sprites.front_default]})
            console.log(this.state.LienPokimage)
        })*/
        this.setState({refreshing:false})
        //console.log("pokedex : " + this.props.pokedex[0].sprites)

    }

    componentDidMount(){
        this.onRefresh();
    }

    render(){
        return(
            this.props.pokedex!==null?(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <NavigationEvents onDidFocus={() => this.onRefresh()} />
                <ImageBackground source={require('../assets/plaineDecor.png')} style={{width: '100%', height: '100%'}}>
                    <FlatList 
                        data={this.props.pokedex}
                        renderItem={({ item }) => 
                            <View style={styles.card}>
                                <Image style={{width: width - 25, height: height - 40}} source={{uri: `${item.sprites}`}} resizeMode='stretch'/>
                            </View>
                        }
                        numColumns={4}
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ImageBackground>
            </View>):(
            <View></View>
            )
        );
    }
}

const width = Dimensions.get('window').width/4
const height = Dimensions.get('window').height/6

const styles = StyleSheet.create({
    listView: {
        flexDirection: 'row',
        flexWrap: 'wrap'
      },
    card: {
        width: width - 15,
        height: height - 30,
        marginLeft: 10,
        marginTop: 10,
        justifyContent:'center', 
        alignItems:'center'
    }
})

const mapStateToProps = state => {
    return { pokemonServ: state.pokemonService.Pokeserv, pokemonFav: state.pokemonFav.pokemonEquipe, pokedex: state.pokedex.pokedex };
};

const mapActionsToProps = (payload) => ({
    actions: {
        initPokedex: bindActionCreators(initPokedex, payload)
    }
});


export default connect(mapStateToProps, mapActionsToProps)(PokedexPage);