
import React, { Component } from 'react';

import reducer from '../redux/reducer';
import {initMQTT,sendGetAllData} from '../callBackMQTT'
import {Client, Message} from 'react-native-paho-mqtt';
import renderLoadingView from './loadingView'
import {connect} from 'react-redux';
import * as action from '../redux/actions'

import {
  Platform,
  StyleSheet,
  Text,AppState,
  View,Dimensions
} from 'react-native';


class Main extends Component<{}> {
    contructor(props) {
        supper(props)
        this.client = null;
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
    render() {
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height; 
        const {visibleLoadingView} = this.props
        return(
            <View>
                {this.props.children}
                {visibleLoadingView==true?renderLoadingView(width,height,visibleLoadingView,true):null}
            </View>
        )
    }
    
}
const mapStateToProps = (state) => {
    return {
        visibleLoadingView: state.visibleLoadingView,
        appState: state.appState
    }
};
export default connect (mapStateToProps,action)(Main);