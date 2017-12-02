import React,{Component} from 'react';
import {Text,View,Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {height,width} from '../../extensionHelper'
class SubItem extends Component {
    contructor(props) {

    }
    render() {
        const {header} = style
        return(
            <LinearGradient colors={this.props.color} style = {{height:(height - (height/3 + 20))/5,}}
            start={{x: 0.0, y: 0}} end={{x: 1, y: 0}}>
                <View style={header}>
                    {this.props.children}
                </View>
            </LinearGradient>
        )
    }
}
const style = {
    header:{
        width,flex:1,
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

export {SubItem}