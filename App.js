import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, TextInput } from 'react-native';
import { Button } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Provider, useDispatch, useSelector } from 'react-redux'
import store from './screens/store/store'
import { fetchBoard } from './screens/store/action'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home'
import Game from './screens/Game'
import Finish from './screens/Finish'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          headerShown: false
        }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="Finish" component={Finish} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
