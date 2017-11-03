import React,{Component} from 'react';
import {Text,View,Dimensions} from 'react-native';
import {SubItem1} from './subItem1'
class Item1 extends Component {
    contructor(props) {

    }
    render() {
        const {header,textItem,item,underLine,subTextItem} = style
        return(
            <SubItem1 color={this.props.check?['#00bf8f','#136a8a']:['#136a8a','#00bf8f']}>
                <View style={item}>
                    <Text style={textItem}>{this.props.title}</Text>
                    <View style={underLine}></View>
                    <Text style={subTextItem}>{this.props.subTitle}</Text>
                </View>
                {this.props.children}
            </SubItem1>
        )
    }
}
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const style = {
    item: {
        alignItems:'flex-start',
        justifyContent:'flex-start'
    },
    textItem:{
        paddingLeft:5,
        paddingRight:5,
        backgroundColor:'transparent',
        color:'white',
        fontSize:15,
        fontWeight:'400',
        width:width/2 - 10,
    }, 
    underLine:{
        height:2,
        width:width/2 - 10,
        backgroundColor:'white'
    },
    subTextItem: {
        color:'white',
        paddingLeft:5,
        fontSize:10,
        backgroundColor:'transparent'
    }
}

export {Item1}