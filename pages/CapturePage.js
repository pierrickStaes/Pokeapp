import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from '../components/Loading';
import TickToDate from '../components/TickToDate';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';

class CapturePage extends React.Component{

    /*state = {
        weather: null
    }

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
    }

    render(){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text>Capture de Pokemon</Text>
            </View>
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

export default CapturePage;