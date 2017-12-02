import React,{Component} from 'react';
import {Text,View,Dimensions} from 'react-native';
import {SubItem} from './subItem'
import {text} from '../../extensionHelper'
export default class Item extends Component {
    constructor(props) {
        super(props)
    }
    componentWillReceiveProps() {

    }
    
    render() {
        const {header,textItem,item,underLine,subTextItem} = style
        return(
            <SubItem syle = {{flexDirection:'row'}} color={this.props.check?['#00bf8f','#136a8a']:['#136a8a','#00bf8f']}>
                <View style={item}>
                    <Text allowFontScaling={false} onPress={()=>{
                        }} style={textItem}>{this.props.title}</Text>
                    <View style={underLine}></View>
                    <Text allowFontScaling={false} style={subTextItem}>{this.props.subTitle}</Text>
                </View>
                {this.props.children}
            </SubItem>
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
        fontSize:text.sizeTitle,
        fontFamily:text.fontFamily,
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
        fontFamily:text.fontFamily,
        fontSize:text.sizeSubTitle,
        backgroundColor:'transparent'
    }
}
