import React from 'react';
import { ImageBackground, Text, View, Image, FlatList, Button,TouchableOpacity,AsyncStorage } from 'react-native';
import { ListItem } from 'react-native-elements';
import Loading from '../components/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { deleteFav, addFav, deleteAllFav } from '../actions/PokemonActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class DetailsPokemon extends React.Component{

    state = {pokemon: null,
            couleur1: [],
            couleur2: [],
            couleur3: [],
            fav: false
    };
    
    convert = require('convert-units');
    gradient = require('../ressources/ColorGradientPoke/');
    
    onBack() {
        this.props.navigation.goBack();
    }

    componentDidMount(){
        var index = [];
         for (var x in this.gradient){
             index.push(x);
         }
         poki = this.props.navigation.getParam('pokemon', [])
        
        if (poki.id<=649){
            this.setState({
                pokemon:poki,
                couleur1:[this.gradient[index[poki.id-1]].colors[0].color.red,this.gradient[index[poki.id-1]].colors[0].color.blue,this.gradient[index[poki.id-1]].colors[0].color.green],
                couleur2:[this.gradient[index[poki.id-1]].colors[1].color.red,this.gradient[index[poki.id-1]].colors[1].color.blue,this.gradient[index[poki.id-1]].colors[1].color.green],
                couleur3:[this.gradient[index[poki.id-1]].colors[2].color.red,this.gradient[index[poki.id-1]].colors[2].color.blue,this.gradient[index[poki.id-1]].colors[2].color.green]
            })
        }
        else{
            this.setState({
                pokemon:poki,
                couleur1:[255,255,255],
                couleur2:[255,255,255],
                couleur3:[255,255,255]
            })
        }
    }

    compareFav(){
        if (this.props.pokemonFav!==null){
            if ( this.props.pokemonFav.findIndex(e => e===this.state.pokemon.sprites) == -1 ){
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

    estFavoris(){
        if (this.compareFav()) {
            return require('../assets/starOk.png');
        }
        else
        {
            return require('../assets/starNonOk.png');
        }
    }

    pressFavorites(){
        if (this.compareFav()) {
            this.props.actions.deleteFav(this.state.pokemon.sprites)
        }
        else{
            if(this.props.pokemonFav.length<6){
                this.props.actions.addFav(this.state.pokemon.sprites)
            }
            else{
                alert('Vous ne pouvez avoir que 6 Pokémons en favoris !')
            }
        }
    }
      
    render(){
        return(
            this.state.pokemon !==null?(
            <View style={{flex:1, backgroundColor:'red'}}>
                <LinearGradient colors={['rgb('+this.state.couleur1[0]+','+this.state.couleur1[1]+','+this.state.couleur1[2]+')','rgb('+this.state.couleur2[0]+','+this.state.couleur2[1]+','+this.state.couleur2[2]+')','rgb('+this.state.couleur3[0]+','+this.state.couleur3[1]+','+this.state.couleur3[2]+')']} style={{flex:1}}>
                    <View style={{flex:1, alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                        <View style={{flex:1, alignItems:'flex-start',justifyContent:'center', marginTop:20, marginLeft:10}}>
                            <TouchableOpacity onPress={() => this.pressFavorites()}>
                                <Image style={{width: 40, height: 40}} source={this.estFavoris()} resizeMode='stretch'/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1, alignItems:'flex-end',justifyContent:'center', marginTop:20, marginRight:10}}>
                            <Button title="Fermer" onPress={() => this.onBack()} />
                        </View>
                    </View>
                    <View style={{flex:10, alignItems:'center',justifyContent:'center'}}>
                        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                            <Image style={{width: 150, height: 150}} source={{uri: `${this.state.pokemon.sprites}`}}/>
                        </View>
                        <View style={{flex:1, alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                            <View style={{flex:1, alignItems:'flex-end',justifyContent:'center'}}>
                                <Text style={{fontSize: 20}}>#{this.state.pokemon.id}</Text>
                            </View>
                            <View style={{flex:3, alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize: 20}}>{this.state.pokemon.name}</Text>
                                <Text style={{fontSize: 15}}>{this.state.pokemon.categorie}</Text>
                            </View>
                        </View>
                        <View style={{height: 1, width: "100%", backgroundColor: "black"}}/>
                        <View style={{flex:2, alignItems:'center',justifyContent:'center'}}>
                            <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize: 10}}>Types</Text>
                            </View>
                            <View style={{flex:1, alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                                <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{fontSize: 20}}>Taille : {(this.convert(this.state.pokemon.height*10).from('cm').to('m').toFixed(1))} m</Text>    
                                </View>
                                <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{fontSize: 20}}>Poids : {(this.convert(this.state.pokemon.weight*100).from('g').to('kg').toFixed(1))} kg</Text>    
                                </View>
                            </View>
                            <View style={{flex:3, alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize: 20, borderWidth: 2,padding:10}}>{this.state.pokemon.description}</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
            ):(<View style={{flex:1, backgroundColor:'red'}}><Text>Marche pas</Text></View>)
        );
    }
}

const mapStateToProps = state => {
    return { pokemonFav: state.pokemonFav.pokemonFav };
};

const mapActionsToProps = (payload) => ({
    actions: {
        addFav: bindActionCreators(addFav, payload),
        deleteFav:bindActionCreators(deleteFav,payload),
        deleteAllFav:bindActionCreators(deleteAllFav,payload)
    }
});

export default connect(mapStateToProps,mapActionsToProps)(DetailsPokemon);