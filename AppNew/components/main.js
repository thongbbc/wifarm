
import React, { Component } from 'react';

import reducer from '../redux/reducer';
import {initMQTT,sendGetAllData} from '../callBackMQTT'
import {Client, Message} from 'react-native-paho-mqtt';
import renderLoadingView from './loadingView'
import {connect} from 'react-redux';
import * as action from '../redux/actions'

import {
  Platform,Animated,
  StyleSheet,Easing,
  Text,AppState,
  View,Dimensions
} from 'react-native';


class Main extends Component {
    constructor(props) {
        super(props)
        this.client = null;
        this.animationMain1=new Animated.Value(1)
        this.animationMain2=new Animated.Value(0)
        this.animationMain3=new Animated.Value(0)

            

    }

    

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        this.reconnect();
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
            console.log(message.payloadString);
        });

        // connect the client
        this.client.connect()
        .then(() => {
            // Once a connection has been made, make a subscription and send a message.
            console.log('onConnect');
            return this.client.subscribe('Thong');
        })
        .then(() => {
            sendGetAllData(this.client)
            this.props.loading(false)        
        })
        .catch((responseObject) => {
            if (responseObject.errorCode !== 0) {
                console.log('onConnectionLost:' + responseObject.errorMessage);
                this.reconnect();
            }
        });
    }
    createAnimation = (value, duration,toValue) =>{
        return Animated.timing(
            value,
            {
                toValue: toValue,
                duration,
            }
        )
    }
    animatingMain(value) {
        const duration = 300
        if (value) {
            Animated.parallel([
                this.createAnimation(this.animationMain1,duration,-850),
                this.createAnimation(this.animationMain2,duration,1),
                this.createAnimation(this.animationMain3,duration,1)
            ]).start()
            
        } else {
            Animated.parallel([
                this.createAnimation(this.animationMain1,duration,1),
                this.createAnimation(this.animationMain2,duration,0),
                this.createAnimation(this.animationMain3,duration,0)
            ]).start()
        }
    }
    render() {
        this.animatingMain(this.props.animating)
        const animationMain33 = this.animationMain2.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '60deg']
        })
        const animationMain22 = this.animationMain3.interpolate({
            inputRange: [0, 1],
            outputRange: [0, (Dimensions.get('window').width * 0.24)]
        })
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height; 
        const {visibleLoadingView} = this.props
        return(
            <Animated.View style = {{
                transform: [
                    { perspective: this.animationMain1 },
                    { translateX: animationMain22 },
                    { rotateY: animationMain33},
                ]
            }}>
                {this.props.children}
                {visibleLoadingView==true?renderLoadingView(width,height,visibleLoadingView,true):null}
            </Animated.View>
        )
    }
    
}
const mapStateToProps = (state) => {
    return {
        visibleLoadingView: state.visibleLoadingView,
        appState: state.appState,
        animating:state.animating
    }
};
export default connect (mapStateToProps,action)(Main);