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
        refreshing:true
    }
    onRefresh(){
        this.setState({refreshing:true})
        this.props.actions.initPokedex()
        this.setState({refreshing:false})
    }

    componentDidMount(){
        this.onRefresh();
    }

    onPressPokemon(pokemonData) {
        this.props.navigation.navigate('Detail',{pokemon:pokemonData})
    }

    compareFav(sprites){
        if (this.props.pokemonFav!==null){
            if ( this.props.pokemonFav.findIndex(e => e===sprites) == -1 ){
                return false;
            }
            else {
                return true;
            }
        }
        else{
            return false;
        }
    }

    estFavoris(sprites){
        if (this.compareFav(sprites)) {
            return require('../assets/starOk.png');
        }
        else
        {
            return null;
        }
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
                                <TouchableOpacity onPress={() => this.onPressPokemon(item)}>
                                <ImageBackground style={{width: width - 25, height: height - 40}} source={{uri: `${item.sprites}`}} resizeMode='stretch'>
                                    <Image style={{width: 15, height: 15}} source={this.estFavoris(item.sprites)} resizeMode='stretch'/>
                                </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        }
                        numColumns={4}
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
    return { pokemonServ: state.pokemonService.Pokeserv, pokemonFav: state.pokemonFav.pokemonFav, pokedex: state.pokedex.pokedex };
};

const mapActionsToProps = (payload) => ({
    actions: {
        initPokedex: bindActionCreators(initPokedex, payload)
    }
});

export default connect(mapStateToProps,mapActionsToProps)(PokedexPage);