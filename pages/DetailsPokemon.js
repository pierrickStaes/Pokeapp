import React from 'react';
import { ImageBackground, Text, View, Image, FlatList, Button,TouchableOpacity,AsyncStorage } from 'react-native';
import { ListItem } from 'react-native-elements';
import Loading from '../components/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

class DetailsPokemon extends React.Component{

    state = {pokemon: null};
    convert = require('convert-units')
    
    onBack() {
        this.props.navigation.goBack();
    }

    componentDidMount(){
        this.setState({
            pokemon:this.props.navigation.getParam('pokemon', [])
        })
    }
      
    render(){
        return(
            this.state.pokemon !==null?(
            <View style={{flex:1, backgroundColor:'red'}}>
                <LinearGradient colors={['#debd41','#b49420']} style={{flex:1}}>
                    <View style={{flex:1, alignItems:'flex-end',justifyContent:'center', marginTop:20, marginRight:10}}>
                        <Button title="Fermer" onPress={() => this.onBack()} />
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

export default DetailsPokemon;