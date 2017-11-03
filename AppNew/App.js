/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Header} from './components/header';
import {Item1} from './components/subItem'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class App extends Component<{}> {
  render() {
    return (
      <View >
        <Header/>
        <Item1 
          check={true}
          title='Do Am Hien Tai'
          subTitle='Rat Tot'/>
        <Item1 
          check={false}
          title='Lam Mat Vuon Nam'
          subTitle='Khong Nen Tuoi'/>
        <Item1 
          check={true}
          title='Lich Su'
          subTitle='Da Tuoi Cach Day 25 Phut'/>
        <Item1 
          check={false}
          title='Quan Sat'
          subTitle='Theo doi lien tuc'/>  
      </View>
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
