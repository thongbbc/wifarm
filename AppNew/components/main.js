
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
  View,Dimensions,TouchableWithoutFeedback, TouchableOpacity
} from 'react-native';


class Main extends Component {
    constructor(props) {
        super(props)
        this.client = null;
        this.animationMain1=new Animated.Value(1)
        this.animationMain2=new Animated.Value(0)
        this.animationMain3=new Animated.Value(0)
        this.width = Dimensions.get('window').width;
        this.height = Dimensions.get('window').height; 
    };
    
    createAnimation = (value, duration,toValue) =>{
        return Animated.timing(
            value,
            {
                toValue: toValue,
                duration,
                easing:Easing.linear
            }
        )
    }
    animatingMain(value) {
        const duration = 500
        if (value) {
            Animated.parallel([
                this.createAnimation(this.animationMain1,duration,-850),
                this.createAnimation(this.animationMain2,duration,1),
                this.createAnimation(this.animationMain3,duration,1)
            ]).start()
            
        } else {
            Animated.parallel([
                this.createAnimation(this.animationMain1,2000,1),
                this.createAnimation(this.animationMain2,duration,0),
                this.createAnimation(this.animationMain3,duration,0)
            ]).start()
        }
    }
    renderViewOffAnimating(check) {
        if (check)
        return(
            <TouchableWithoutFeedback
                onPress={()=>{this.props.onOrOffAnimating(!this.props.animating)}}
                style={{position:'absolute',width:this.width,height:this.height}}>
                <View style={{position:'absolute',width:this.width,height:this.height}}/>
            </TouchableWithoutFeedback>
        )
    }
    render() {
        this.animatingMain(this.props.animating)
        const animationMain33 = this.animationMain2.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '60deg']
        })
        const animationMain22 = this.animationMain3.interpolate({
            inputRange: [0, 1],
            outputRange: [0, (this.width * 0.24)]
        })
        const {visibleLoadingView} = this.props
        return(
            <View style = {{position:'absolute',justifyContent:'center'}}>
                <View 
                style = {{alignItems:'center',position:'absolute',width:this.width/2,height:this.height/2}}>
                    <TouchableOpacity onPress = {()=>{
                         this.props.navigation.navigate('ManageDeviceScreen', {name: 'Lucy'})
                    }}>
                        <View>
                            <Text style = {{padding:10,fontSize:15,color:'white',backgroundColor:'transparent'}}>Setting</Text>
                        </View>
                    </TouchableOpacity>
                    <View><Text style = {{padding:10,fontSize:15,color:'white',backgroundColor:'transparent'}}>About</Text></View>
                </View>
                <Animated.View style = {{
                    transform: [
                        { perspective: this.animationMain1 },
                        { translateX: animationMain22 },
                        { rotateY: animationMain33},
                    ],marginTop:0
                }}>
                    {this.props.children}
                    {visibleLoadingView==true?renderLoadingView(this.width,this.height,visibleLoadingView,
                        true):null}
                    {this.renderViewOffAnimating(this.props.animating)}
                </Animated.View>
            </View>
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