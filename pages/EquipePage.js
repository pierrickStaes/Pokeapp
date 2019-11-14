import React from 'react';
import { StyleSheet, ImageBackground , View, Image, Dimensions, FlatList,StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initPokedex } from '../actions/PokedexActions';
import { initFav } from '../actions/PokemonActions';
import Swiper from 'react-native-swiper';

class EquipePage extends React.Component{

    state = {
        LienPokimage: null,
        refreshing:true
    }
    onRefresh(){
        this.setState({refreshing:true})
        this.props.actions.initPokedex()
        this.props.actions.initFav()
        this.setState({refreshing:false})
    }

    componentDidMount(){
        StatusBar.setHidden(true);
        this.onRefresh();
    }
      
    render(){
        return(
            <Swiper>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
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
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ImageBackground source={require('../assets/plage.png')} style={{width: '100%', height: '100%'}}>
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
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ImageBackground source={require('../assets/mountain.png')} style={{width: '100%', height: '100%'}}>
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
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ImageBackground source={require('../assets/ruines.png')} style={{width: '100%', height: '100%'}}>
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
            </Swiper>
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