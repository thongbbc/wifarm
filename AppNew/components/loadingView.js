import React from 'react';

var Spinner = require('react-native-spinkit');
import {
    View,Text
} from 'react-native';
function renderLoadingView(width,height,visible,kindOfLoadingView) {
    if (kindOfLoadingView){
        return (
        <View style ={{position:'absolute',height,width,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.3)'}}>
            <Spinner isVisible={visible} size={width/4} type={'FadingCircle'} color={'#FFF'}/>
            <View style={{width:100,justifyContent:'center',flexDirection:'row',top:30}}>
                <Text style={{right:5,color:'white',fontWeight:'bold'}}>Connecting</Text>
                <Spinner isVisible={visible} size={20} type={'ThreeBounce'} color={'#FFF'}/>
            </View>
        </View>
        )
    } else {
        return (
        <View style ={{position:'absolute',height,width,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.3)'}}>
            <Spinner isVisible={visible} size={width/4} type={'WanderingCubes'} color={'#FFF'}/>
            <View style={{width:100,justifyContent:'center',flexDirection:'row',top:20}}>
                <Text style={{right:5,color:'white',fontWeight:'bold'}}>Loading</Text>
                <Spinner isVisible={visible} size={20} type={'ThreeBounce'} color={'#FFF'}/>
            </View>
        </View>
        )
    }
       
}

export default renderLoadingView;