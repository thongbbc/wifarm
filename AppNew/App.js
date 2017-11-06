/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
//Component
import {Header} from './components/header';
import Item from './components/subItem/item';
import Main from './components/main'
//Redux
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './redux/reducer';
//Method using MQTT
import {initMQTT,sendGetAllData} from './callBackMQTT'
import {Client, Message} from 'react-native-paho-mqtt';


import {
  Platform,
  StyleSheet,
  Text,AppState,
  View
} from 'react-native';


export default class App extends Component<{}> {
  
  render() {
    return (
      <Provider store ={createStore(reducer)}>
        <Main >
          <Header/>
          <Item
            check={true}
            title='Do Am Hien Tai'
            subTitle='Rat Tot'/>
          <Item
            check={false}
            title='Lam Mat Vuon Nam'
            subTitle='Khong Nen Tuoi'/>
          <Item
            check={true}
            title='Lich Su'
            subTitle='Da Tuoi Cach Day 25 Phut'/>
          <Item
            check={false}
            title='Quan Sat'
            subTitle='Theo doi lien tuc'/>  
        </Main>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
