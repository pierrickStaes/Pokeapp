import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Alert, TouchableHighlight, ActivityIndicator, Vibration } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from '../components/Loading';
import TickToDate from '../components/TickToDate';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import PokemonService from '../services/PokemonService';
import { bindActionCreators } from 'redux';
import { addPokedex } from '../actions/PokedexActions';

PATTERN = [1000, 300, 100, 300, 1400, 300, 100, 300];

class CapturePage extends React.Component{

    state = {
        position: null,
        pokemonNum: null,
        pokemon: null,
        animating: false,
        hidden: true,
        hidden2: true,
    }

    //pokeService = new PokemonService()

    animate(bool){
        if (bool == true){
            this.setState({animating: false});
            this.setState({animating: false});
            console.log("animate "+this.state.animating);
        }
        else{
            this.setState({animating: true});
            console.log("animate "+this.state.animating);
        }
    }
    
    wait(ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
          end = new Date().getTime();
       }
     }
    findPokemon =()=> {
        //this.animate(this.state.animating);
        this.setState({pokemon: null})
        this.setState({hidden2: false});
        Vibration.vibrate(PATTERN);

        navigator.geolocation.getCurrentPosition(
            position => {
              //  this.wait(3000);

                console.log("animate "+this.state.animating);
                this.setState({position});                
                console.log("longitude : "+this.state.position.coords.longitude);
                console.log("latiture : "+this.state.position.coords.latitude);
                latitude = this.state.position.coords.latitude
                longitude = this.state.position.coords.longitude

                pokemonNum = this.findNumber(longitude,latitude);
                
                //alert(this.state.pokemon);    
                this.props.pokemonServ.getPokemonDataNumero(pokemonNum).then((resp) =>{
                  //  this.setState({hidden2: true});
                 //   this.setState({hidden1: false});
                    setTimeout(()=>{
                        this.setState({hidden2: true});
                        this.setState({hidden: false});

                        console.log('test1')
                    }, 4000);
                    setTimeout(()=>{
                        this.setState({hidden: true});
                        this.setState({pokemon: resp.data})

                        

                        this.props.actions.addPokedex({name : resp.data.name, height : resp.data.height, weight : resp.data.weight, id: resp.data.id, sprites: resp.data.sprites.front_default, type_name: resp.data.types})
                        console.log("pokedex"+this.props.pokedex)
                        console.log('test2')

                    }, 4500);


                    //console.log('pokemon '+ JSON.stringify(this.state.pokemon.name))
                    this.animate(this.state.animating);

                });
            },
            error => Alert.alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        )
    }


    

    findNumber(long,lat){

        latDecimal = lat.toString().slice(-6,-3);
        longDecimal = long.toString().slice(-6,-3);


        console.log("latdecimal"+latDecimal);
        console.log("longDecimal"+longDecimal);

        number = (parseInt(latDecimal)+parseInt(longDecimal))/2;
        console.log(number);


        //number = (long+lat)/3;
        //console.log(number);
       // number = Math.round( number * 10 );

        number = Math.round(number * 807 /999);
        console.log(number);
        return number;
    }




/*
    //Nouvelle version qui marchait sur mon binome mais pas dans mon code (pas d'erreur juste ça marche pas)
    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.props.weather.getWeatherCoords(position.coords.longitude,position.coords.latitude).then((resp) => {
                    this.setState({weather:resp.data})
                })
            },
            error => Alert.alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        )
    }*/

    componentDidMount(){
        //this.findPokemon();
        //this.setState({animating: false});


    }

    render(){
        return(
            this.state.position !== null && this.state.pokemon !==null?(
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text>Capture de Pokemon2</Text>
                    <Text>{this.state.pokemon.name}</Text>

                    <Image style={{width:200, height: 200}} source={{uri : `${this.state.pokemon.sprites.front_default}` }}></Image>
                    <Image style={this.state.hidden == true? (gif.hidden):(gif.notHidden)}
                            source={require('../assets/catched.png')}
                        />
                    <Image style={this.state.hidden2== true? (gif.hidden):(gif.notHidden)}
                            source={require('../assets/test.gif')}
                        />
                    <TouchableHighlight  onPress={this.findPokemon}>
                        <Image style={{width:100, height: 100}}
                            source={require('../assets/capture.png')}
                        />
                    </TouchableHighlight>
                </View>):(
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text>Capture de Pokemon1</Text>
                    <Image style={this.state.hidden == true? (gif.hidden):(gif.notHidden)}
                            source={require('../assets/catched.png')}
                        />
                    <Image style={this.state.hidden2== true? (gif.hidden):(gif.notHidden)}
                            source={require('../assets/test.gif')}
                        />
                    <View>

                    </View>
                    <TouchableHighlight  onPress={this.findPokemon}>
                        <Image style={{width:100, height: 100}}
                            source={require('../assets/capture.png')}
                        />
                    </TouchableHighlight>
                </View>

            )
        )
    }
}

/*function mapDispatchToProps(dispatch) {
    return {
        weather: dispatch(getWeatherService())
    };
}

const mapStateToProps = state => {
    return { weather: state.weatherService.serv };
};*/

 gif = StyleSheet.create({
    hidden: {
        display : 'none',
        width:100, 
        height: 100
    },
    notHidden:{
        display : 'flex',
        width:100, 
        height: 100
    }

});    

const mapStateToProps = state => {
    return { pokemonServ: state.pokemonService.Pokeserv, pokedex : state.pokedex.pokedex};
};

const mapActionsToProps = (payload) => ({
    actions: {
        addPokedex: bindActionCreators(addPokedex, payload)
    }
});

export default connect(mapStateToProps, mapActionsToProps)(CapturePage);