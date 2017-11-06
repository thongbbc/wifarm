import React,{Component} from 'react';
import {Text,View,Dimensions} from 'react-native';
import {SubItem1} from './subItem1'
import {connect} from 'react-redux';
import * as action from '../../redux/actions'
import {initMQTT,sendGetAllData} from '../../callBackMQTT'
import {Client, Message} from 'react-native-paho-mqtt';
class Item1 extends Component {
    contructor(props) {
       this.client = null;
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
    }
    componentDidMount() {
        this.reconnect();
    }
    componentWillReceiveProps() {

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
        })
        .catch((responseObject) => {
            if (responseObject.errorCode !== 0) {
                console.log('onConnectionLost:' + responseObject.errorMessage);
                this.reconnect();
            }
        });
    }
    
    render() {
        const {header,textItem,item,underLine,subTextItem} = style
        return(
            <SubItem1 color={this.props.check?['#00bf8f','#136a8a']:['#136a8a','#00bf8f']}>
                <View style={item}>
                    <Text onPress={()=>{this.props.hello();
                        }} style={textItem}>{this.props.title}</Text>
                    <View style={underLine}></View>
                    <Text style={subTextItem}>{this.props.subTitle}</Text>
                </View>
                {this.props.children}
            </SubItem1>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        client: state.client
    }
};
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

export default connect (mapStateToProps,action)(Item1);