import React, {Component} from 'react';
import {View, Text} from 'react-native';
export default class Foo extends Component{
  constructor(props){
      super(props);
  }
  woop(){
    alert('click');
  }
  render() {
      return(
        <View><Text>Class Foo</Text></View>
      );
    
  }
}