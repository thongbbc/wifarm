
import React, { Component } from 'react';

import reducer from '../redux/reducer';
import {initMQTT,sendGetAllData,analyzeData} from '../callBackMQTT'
import {Client, Message} from 'react-native-paho-mqtt';
import renderLoadingView from './loadingView'
import {connect} from 'react-redux';
import * as action from '../redux/actions'
import LinearGradient from 'react-native-linear-gradient';
import {width,height,topicSub} from '../extensionHelper'
import Main from './main'
import SuperHeader from './header/header'
import Item from './subItem/item'
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Platform,Animated,Switch,AsyncStorage,
  StyleSheet,Easing,ScrollView,
  Text,AppState,
  View,Dimensions,TouchableWithoutFeedback
} from 'react-native';


class FullScreen extends Component<{}> {
    // static navigationOptions = {
    //   drawerLabel: 'MainScreen',drawerLockMode: 'locked-closed',
    //   drawerIcon: ({tintColor}) => (
    //     <Icon color='white' 
    //       size={15} name={'desktop'} />
    //   )
    // };
    constructor(props){
      super(props)
      this.client = null;
      this.stateDrawer = false
      this.width = Dimensions.get('window').width,
      this.height = Dimensions.get('window').height
    }
    async getAllDevice() {
        try {
            this.props.setCurrentDevice = await AsyncStorage.getItem('device');
            if (value !== null){
                console.log(value);
            }
        } catch (error) {
        // Error retrieving data
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('devices').then((data)=> {            
            if (data != undefined) {
                const jsonData = JSON.parse(data)
                this.props.setCurrentDevice(jsonData.macId)
            }
        }).then(()=> {
            AppState.addEventListener('change', this._handleAppStateChange);
            this.reconnect();
        })
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }
    reconnect() {
        if (!this.client)
        {
            this.client = initMQTT();
            this._callBackReceiver();
        } else {
            this.client = initMQTT();
            this._callBackReceiver();
        }
        this.props.loading(true)
    }
  
    _handleAppStateChange = (nextAppState) => {
        if (this.props.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!')
        }
        this.props.changeAppState(nextAppState);
    }
  
    _callBackReceiver() {
        this.client.on('connectionLost', (responseObject) => {
            if (responseObject.errorCode !== 0) {
                console.log(responseObject.errorMessage);
            }
        });
        this.client.on('messageReceived', (message) => {
            const payloadString = message.payloadString
            debugger
            console.log(payloadString);            
            analyzeData(payloadString,this.props)
        });
        this.client.connect()
        .then(() => {
            console.log('onConnect');
            debugger
            if (this.props.currentDevice) {
                const macId = this.props.currentDevice.macId
                return this.client.subscribe(topicSub(macId));            
            }
        })
        .then(() => {
            debugger
            sendGetAllData(this.client,this.props.currentDevice.macId)
            this.props.loading(false)        
        })
        .catch((responseObject) => {
            if (responseObject.errorCode !== 0) {
                console.log('onConnectionLost:' + responseObject.errorMessage);
                this.reconnect();
            }
        });
    }
    render() {
      const {TE_01,WL_01} = this.props.allData
      return (
        <View style={{flex:1}}>
          <LinearGradient colors={['#136a8a','#136a8a','#00bf8f']}
          start={{x: 0.0, y: 0}} end={{x: 1, y: 0}} style = {{width,height:height}}>
          </LinearGradient>
          <Main navigation = {this.props.navigation}>
            <SuperHeader client={this.client}/>
            <ScrollView style = {{width,height:height-(height/3 + 20)}}>
            <Item
              check={true}
              title='Nhiet do'
              subTitle='Rat Tot'>
              <Text style = {{color:'white',backgroundColor:'transparent',fontSize:25,right:-10}}>{TE_01}</Text>
              <Icon color='white' style = {{right:5,height:35,width:35,backgroundColor:'transparent'}} size={35} name={'tint'} />
            </Item>
            <Item
              check={true}
              title='Muc nuoc'
              subTitle='Rat Tot'>
              <Text style = {{color:'white',backgroundColor:'transparent',fontSize:25,right:-10}}>{WL_01}</Text>
              <Icon color='white' style = {{right:5,height:35,width:35,backgroundColor:'transparent'}} size={35} name={'tint'} />
            </Item>
            <Item
              check={true}
              title='Do Am Hien Tai'
              subTitle='Rat Tot'>
              <Text style = {{color:'white',backgroundColor:'transparent',fontSize:25,right:-10}}>{}</Text>
              <Icon color='white' style = {{right:5,height:35,width:35,backgroundColor:'transparent'}} size={35} name={'tint'} />
            </Item>
            <Item
              check={false}
              title='Lam Mat Vuon Nam'
              subTitle='Khong Nen Tuoi'>
              <View style = {{right:10}}>
                <Switch tintColor = {'white'} color={'white'} />
                <Text style = {{top:5,color:'white',backgroundColor:'transparent',textAlign:'center'}}>Off</Text>
              </View>
            </Item>
            <Item
              check={true}
              title='Lich Su'
              subTitle='Da Tuoi Cach Day 25 Phut'>
              <View style = {{right:10,alignItems:'center'}}>
                <Icon color='white' style = {{height:30,width:35,backgroundColor:'transparent',alignItems:'center',justifyContent:'center'}} size={30} name={'area-chart'} />
                <Text style = {{top:5,color:'white',backgroundColor:'transparent',textAlign:'center',fontSize:10}}>Kiểm tra</Text>
              </View>
            </Item>
            <Item
              check={false}
              title='Quan Sat'
              subTitle='Theo doi lien tuc'>
              <Icon color='white' style = {{right:10,height:30,width:35,backgroundColor:'transparent',alignItems:'center',justifyContent:'center'}} size={30} name={'video-camera'} />  
            </Item>
            <Item
              check={true}
              title='TIP'
              subTitle='TRICK'>
              <Icon color='white' style = {{right:10,height:30,width:35,backgroundColor:'transparent',alignItems:'center',justifyContent:'center'}} size={30} name={'coffee'} />  
            </Item>
            </ScrollView>
          </Main>
        </View>
      );
    }
  }
const mapStateToProps = (state) => {
    return {
        visibleLoadingView: state.visibleLoadingView,
        appState: state.appState,
        animating:state.animating,
        allData:state.allData,
        currentDevice:state.currentDevice
    }
};
export default connect (mapStateToProps,action)(FullScreen);