import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { storage } from './storage';
import { Provider } from 'react-redux'

class App extends React.Component {
  render(){
    return (
      <Provider store={storage}>
        <AppNavigator></AppNavigator>
      </Provider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
