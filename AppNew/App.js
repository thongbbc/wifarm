/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
//Component
import {StackNavigator, DrawerNavigator,DrawerItems} from 'react-navigation'
import SuperHeader from './components/header/header';
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
import {width,height} from './extensionHelper'
import FullScreen from './components/fullScreen'
import {
  Platform,Image,ScrollView,
  StyleSheet,Switch,
  Text,AppState,Dimensions,
  View,
  TouchableOpacity
} from 'react-native';
class ManageDeviceScreen extends Component<{}> {
  render() {
    return(
      <View style = {{flex:1,backgroundColor:'red'}}>
      </View>
    )
  }
}

const Navigator = StackNavigator({
  FullScreen: {
    screen: FullScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
      gesturesEnabled: false,
    })
  },
  ManageDeviceScreen: {screen: ManageDeviceScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
      gesturesEnabled: false,
    }),
  }
});

export default class App extends Component {
  render() {
    return(
      <Provider store ={createStore(reducer)}>
        <Navigator/>
      </Provider>
    )
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