import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

class PokedexPage extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text>
                        Page de Pokedex/PC
                    </Text>
                </View>
            </View>
        );
    }
}

export default PokedexPage;