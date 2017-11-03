import React,{Component} from 'react';
import {Text,View,Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class SubItem1 extends Component {
    contructor(props) {

    }
    render() {
        const {header} = style
        return(
            <LinearGradient colors={this.props.color}
            start={{x: 0.0, y: 0}} end={{x: 1, y: 0}}>
                <View style={header}>
                    {this.props.children}
                </View>
            </LinearGradient>
        )
    }
}
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const style = {
    header:{
        width,
        height:70,
        paddingLeft:10,paddingRight:10,
        paddingTop:5,
        paddingBottom:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderColor:'white',
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
}

export {SubItem1}