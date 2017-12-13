import React,{Component} from 'react';
import {AsyncStorage,Text,View,Dimensions,Keyboard,Image,TouchableOpacity,TouchableHighlight,TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import reducer from '../../redux/reducer';
import {connect} from 'react-redux'
import * as action from '../../redux/actions'
import Swiper from 'react-native-swiper';
import Header from './subheader'
import { NetworkInfo } from 'react-native-network-info';
import Smartconfig from 'react-native-smartconfig';
import {topicSend,topicSub} from '../../extensionHelper'
import {initMQTT,sendGetAllData,analyzeData} from '../../callBackMQTT'
class SuperHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nameWifi:'',
            passWifi:'',
            nameDevice:''
        }
    }
    _configStart() {
        Keyboard.dismiss()        
        const {nameWifi,passWifi,nameDevice} = this.state;
        const self= this
        if (nameWifi != '' && passWifi != '' && nameDevice != '') {
            this.props.loading(true)            
            Smartconfig.start({
                type: 'esptouch',
                ssid: nameWifi,
                bssid: '',
                password: passWifi,
                timeout: 10000
            }).then(function(results){
                debugger
                const json = {
                    macId:results[0].bssid,
                }
                const jsonString = JSON.stringify(json)
                try {
                    AsyncStorage.setItem('devices',jsonString); 
                    self.props.setCurrentDevice(json.macId);
                    this.client.subscribe(topicSub(json.macId));
                    sendGetAllData(this.client,json.macId)     
                } catch (error) {
                    console.log(error)
                }
                self.props.loading(false)                   
            }).catch(function(error) {
                    Smartconfig.stop();
                    // self.props.startConfig(false)   
                    self.props.loading(false)   
                    alert('Thiết lập thất bại lỗi đường truyền hoặc sai thông tin')                                
                });
        } else {
        alert('PLEASE CHECK YOUR SSID OR PASSWORD,NAME DEVICE!')
        }
    }
    componentDidMount() {
        NetworkInfo.getSSID(ssid => {
            if (ssid != undefined) {
                this.setState({nameWifi: ssid})
            }
        });
        this.setState({passWifi:'',nameDevice:''})
    }
    render() {
        const {header,banner,imageHeader,titleText,subTitleText} = style        
        const {nameWifi,passWifi,nameDevice} = this.state
        return (
        <View style = {style.header}>
            <Swiper showsButtons={false} showsPagination={false} loop={false}
                ref = 'swiper'> 
                <Header swipe = {this.refs.swiper}/>
                <LinearGradient colors={['#136a8a','#00bf8f']}
                start={{x: 0.0, y: 0}} end={{x: 1, y: 0}}
                style={header}>
                    <View style={banner}>
                    <TouchableOpacity style={{height:30,width:30}} onPress={()=>{
                            this.refs.swiper.scrollBy(-1)
                        }}>
                        <View>
                            <Icon color='white' style = {{left:5,height:30,width:30}} size={25} name={'arrow-left'} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{height:30,width:30}} onPress={()=>{
                            alert("Made by Creta Team")
                    }}>
                        <View>
                            <Icon color='white' style = {{textAlign:'center',height:25,width:25,justifyContent:'center',alignItems:'center'}} size={25} name={'info'} />
                        </View>
                    </TouchableOpacity>
                    </View>
                    <View style = {{flex:1,justifyContent:'center'}}>
                        <TextInput 
                        onChangeText = {(text)=>this.setState({nameWifi:text})}
                        value={nameWifi} placeholder={'SSID'} style = {{borderRadius:20,textAlign:'center',backgroundColor:'rgba(255,255,255,0.5)',borderBottomWidth:1,borderBottomColor:'white',width:width-40,height:35}}/>
                        <TextInput 
                        onChangeText = {(text)=>this.setState({passWifi:text})}                                                
                        value={passWifi} placeholder={'PASSWORD'} style = {{borderRadius:20,textAlign:'center',backgroundColor:'rgba(255,255,255,0.5)',borderBottomWidth:1,borderBottomColor:'white',width:width-40,height:35}}/>
                        <TextInput 
                        onChangeText = {(text)=>this.setState({nameDevice:text})}                                                                                                
                        value={nameDevice} placeholder={'NAME DEVICE'} style = {{borderRadius:20,textAlign:'center',backgroundColor:'rgba(255,255,255,0.5)',borderBottomWidth:1,borderBottomColor:'white',width:width-40,height:35}}/>
                        <TouchableOpacity onPress = {this._configStart.bind(this)}>
                        <View style = {{borderRadius:20,justifyContent:'center',alignItems:'center',width:width-40,height:35,backgroundColor:'white',top:5}}>
                            <Text style = {{fontSize:20,color:'gray',fontWeight:'bold'}}>OK</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </Swiper>
        </View>
      )
    }
}





const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const style = {
    header:{
        width:width,
        height:height/3 + 20,
        alignItems:'center',
        justifyContent:'center',
    },
    imageHeader: {
        position:'absolute',top:20,
        height:50,width:50,left:4
    },
    banner:{
        height:40,flexDirection:'row',width,alignItems:'center',
        width,justifyContent:'space-between',top:20,paddingLeft:5,paddingRight:5,
        backgroundColor:'transparent',
    },
    titleText:{
        fontSize:80,
        color:'white',
        paddingTop:30,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "white",
        backgroundColor:'transparent'
    },
    subTitleText: {
        color:'white',
        backgroundColor:'transparent',
        textAlign:'center',
        fontWeight:'300',
        fontSize:20,top:-5

    }
    
}
const mapStateToProps = (state) => {
    return {
        visibleLoadingView: state.visibleLoadingView,
        appState: state.appState,
        animating:state.animating
    }
};
// export default connect (mapStateToProps,action)(Header);
export default connect (mapStateToProps,action)(SuperHeader);