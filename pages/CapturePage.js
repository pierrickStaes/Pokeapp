import React from 'react';
import { StyleSheet, Text, View, Image, Vibration, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
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
        second:10,
        timerprogress:false,
        disabled:false,
    }
    

    //pokeService = new PokemonService()

    animate(bool){
        if (bool == true){
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

    comparePokemon(num){
        if (this.props.pokedex!==null){
            if ( this.props.pokedex.findIndex(e => e.id===num) == -1 ){
                return true;
            }
            else {
                return false;
            }
        }
        else{
            return true;
        }

    }

    findPokemon =()=> {
        this.setState({disabled: true})
        //this.animate(this.state.animating);
        if (this.state.timerprogress!== true){
        
        
        navigator.geolocation.getCurrentPosition(
            position => {
              //  this.wait(3000);
              
                this.setState({pokemon: null})
                this.setState({hidden2: false});
                Vibration.vibrate(PATTERN, true);
                this.Start();
                console.log("animate "+this.state.animating);
                this.setState({position});                
                console.log("longitude : "+this.state.position.coords.longitude);
                console.log("latiture : "+this.state.position.coords.latitude);
                latitude = this.state.position.coords.latitude
                longitude = this.state.position.coords.longitude

                pokemonNum = this.findNumber(longitude,latitude);
                
                //alert(this.state.pokemon);    
                this.props.pokemonServ.getPokemonSpeciesDataNumero(pokemonNum).then((resp) =>{
                  //  this.setState({hidden2: true});
                 //   this.setState({hidden1: false});
                    setTimeout(()=>{
                        this.setState({hidden2: true});
                        this.setState({hidden: false});

                        console.log('test1')
                    }, 4000);
                    setTimeout(()=>{
                        this.setState({hidden: true});
                        var nom = 'inconnu'
                        for (let pokemon of resp.data.names) {
                            if(pokemon.language.name == "fr"){
                                nom = pokemon.name
                            }
                        }
                        if (this.comparePokemon(resp.data.id)==true){
                            var description = 'inconnu'
                            var categorie = 'inconnu'
                            for (let pokemon of resp.data.flavor_text_entries) {
                                if(pokemon.language.name == "fr"){
                                    description = pokemon.flavor_text
                                }
                            }
                            for (let pokemon of resp.data.genera) {
                                if(pokemon.language.name == "fr"){
                                    categorie = pokemon.genus
                                }
                            }
                            this.props.pokemonServ.getPokemonDataNumero(pokemonNum).then((resp2) =>{
                                this.props.actions.addPokedex({name : nom, 
                                    height : resp2.data.height, 
                                    weight : resp2.data.weight, 
                                    id: resp.data.id, 
                                    sprites: resp2.data.sprites.front_default, 
                                    type_name: resp2.data.types,
                                    description : description,
                                    categorie: categorie})
                                this.setState({
                                    pokemon:{name:nom, sprite: resp2.data.sprites.front_default, id: resp.data.id}
                                })
                                Vibration.cancel();

                            })
                        }

                        else{
                            this.props.pokemonServ.getPokemonDataNumero(pokemonNum).then((resp2) =>{
                                this.setState({
                                    pokemon:{name:nom, sprite: resp2.data.sprites.front_default}
                                })
                            })
                            alert(`${nom} déjà trouvé, allez plus loin !`)
                            this.setState({disabled: false})
                            Vibration.cancel();
                        }
                        console.log("pokedex"+this.props.pokedex)
                        console.log('test2')

                    }, 4500);


                    //console.log('pokemon '+ JSON.stringify(this.state.pokemon.name))
                    this.animate(this.state.animating);

                });
            },
            error => this.catchError(),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        )
        }else {
            alert('Il vous reste encore '+this.state.second+ 'secondes avant une nouvelle capture !');
            this.setState({disabled: false})
        }
    }


    catchError(){
        alert("Problème de connexion veuillez relancer.");
        Vibration.cancel();
        this.setState({hidden2: true});
        this.Reset();
        this.setState({disabled: false})
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

    _interval= null;

    Start = () => {
        this._interval = setInterval(()=>{
            this.setState({
                second: this.state.second-1,
                timerprogress: true
            })
            this.Reset();
        },1000);
    }

    Reset = () => {
        if(this.state.second==0){
            this.setState({
                second:10
            })
            clearInterval(this._interval);
            this.setState({timerprogress: false})
            this.setState({disabled: false})
        }
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
                    <Text style={{fontSize:38}}>Capture de Pokemon</Text>
                    <Text style={{fontSize:22}}>{this.state.pokemon.name}</Text>
                    <Image style={{width:200, height: 200}} source={{uri : `${this.state.pokemon.sprite}` }}></Image>
                    <Text style={{fontSize:22}}>#{this.state.pokemon.id}</Text>
                    <Image style={this.state.hidden == true? (gif.hidden):(gif.notHidden)}
                            source={require('../assets/catched.png')}
                        />
                    <Image style={this.state.hidden2== true? (gif.hidden):(gif.notHidden)}
                            source={require('../assets/test.gif')}
                        />
                    <TouchableWithoutFeedback  onPress={this.findPokemon} disabled ={this.state.disabled}>
                        <Image style={{width:100, height: 100}}
                            source={require('../assets/capture.png')}
                        />
                    </TouchableWithoutFeedback>
                    <Text>{this.state.second}</Text>

                </View>):(
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:30}}>Capture de Pokemon</Text>
                    <Image style={this.state.hidden == true? (gif.hidden):(gif.notHidden)}
                            source={require('../assets/catched.png')}
                        />
                    <Image style={this.state.hidden2== true? (gif.hidden):(gif.notHidden)}
                            source={require('../assets/test.gif')}
                        />
                    <View>

                    </View>
                    <TouchableWithoutFeedback  onPress={this.findPokemon} disabled ={this.state.disabled}>
                        <Image style={{width:100, height: 100}}
                            source={require('../assets/capture.png')}
                        />
                    </TouchableWithoutFeedback>
                    <Text>{this.state.second}</Text>
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