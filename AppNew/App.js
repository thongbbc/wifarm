/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
//Component
import {StackNavigator, DrawerNavigator,DrawerItems} from 'react-navigation'
import Header from './components/header/header';
import Item from './components/subItem/item';
import Main from './components/main'
//Redux
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './redux/reducer';
//Method using MQTT
import {initMQTT,sendGetAllData} from './callBackMQTT'
import {Client, Message} from 'react-native-paho-mqtt';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';


import {
  Platform,Image,ScrollView,
  StyleSheet,
  Text,AppState,Dimensions,
  View,
  TouchableOpacity
} from 'react-native';


export default class App extends Component<{}> {
  // static navigationOptions = {
  //   drawerLabel: 'MainScreen',drawerLockMode: 'locked-closed',
  //   drawerIcon: ({tintColor}) => (
  //     <Icon color='white' 
  //       size={15} name={'desktop'} />
  //   )
  // };
  constructor(props){
    super(props)
    this.stateDrawer = false
    this.width = Dimensions.get('window').width,
    this.height = Dimensions.get('window').height
  }
  render() {
    
    return (
      <Provider store ={createStore(reducer)}>
      <View style={{flex:1}}>
        <LinearGradient colors={['#136a8a','#136a8a','#00bf8f']}
        start={{x: 0.0, y: 0}} end={{x: 1, y: 0}} style = {{flex:1}}>
        </LinearGradient>
        <Main >
          <Header method={this.method}/>
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

      </View>
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
class ManageDeviceScreen extends Component<{}> {
  static navigationOptions = {
    drawerLabel: 'ManageDevice',
    drawerIcon: ({tintColor}) => 
    (<Icon color='white' 
        size={15} name={'cogs'} />)
  };
}
// export default App = DrawerNavigator({
//   MainScreen: {
//     screen: MainScreen
//   },
//   ManageDevice: {
//     screen: ManageDeviceScreen
//   }
// }, {
//   initialRouteName: 'MainScreen',
//   drawerPosition: 'left',drawerWidth:Dimensions.get('window').width,
//   drawerBackgroundColor: 'transparent',
//   contentComponent: props => 
//       <View style = {{backgroundColor:'transparent',width:Dimensions.get('window').width,
//           height:Dimensions.get('window').height,flexDirection:'row'}}>
//         <View 
//           style = {{backgroundColor:'transparent',
//           width:Dimensions.get('window').width/2,
//           height:Dimensions.get('window').height}} >
//           <DrawerItems activeTintColor='#fff' activeBackgroundColor='rgba(0, 0, 0, .4)' labelStyle={{color: '#ffffff',fontSize:10}} {...props} />
//         </View>
//         <TouchableOpacity onPress = {()=>{
//             props.navigation.navigate('DrawerToggle')
//           }}>
//         <View
//         style = {{
//           backgroundColor:'transparent',
//           width:Dimensions.get('window').width/2,
//           height:Dimensions.get('window').height}}>
//         </View>
//         </TouchableOpacity>
//       </View>
// })