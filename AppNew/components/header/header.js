import React from 'react';
import {Text,View,Dimensions,Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const Header = () => {
   const width = Dimensions.get('window').width;

    const {titleText,header,banner,imageHeader,subTitleText} = style;
    return(
        <LinearGradient colors={['#136a8a','#00bf8f']}
        start={{x: 0.0, y: 0}} end={{x: 1, y: 0}}
         style={header}>
        <View style={header}>
            <View style={banner}></View>
            <View style={{paddingTop:10,width:width-40,alignItems:'center',paddingBottom:20}}>
                <Image
                    style={imageHeader}
                    resizeMode='cover'
                    source={require('../../image/wifiIcon.png')}
                />
                <Text style={titleText}>inFarm</Text>
                <Text style={subTitleText}>connect  with  nature</Text>
            </View>
        </View>
        </LinearGradient>
    )
}



const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const style = {
    header:{
        width,
        height:height/3,
        paddingTop:10,
        alignItems:'center',
        justifyContent:'center',
    },
    imageHeader: {
        position:'absolute',top:10,
        height:50,width:50,left:25
    },
    banner:{
        height:30,
        width,
        backgroundColor:'black',
    },
    titleText:{
        fontSize:80,
        color:'white',
        paddingTop:20,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "white",
        backgroundColor:'transparent'
    },
    subTitleText: {
        backgroundColor:'transparent',
        color:'white',
        fontWeight:'300',
        fontSize:20,top:-5

    }
    
}
export {Header}