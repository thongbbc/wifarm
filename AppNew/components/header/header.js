import React,{Component} from 'react';
import {Text,View,Dimensions,Image,TouchableOpacity,TouchableHighlight,TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import reducer from '../../redux/reducer';
import {connect} from 'react-redux'
import * as action from '../../redux/actions'
import Swiper from 'react-native-swiper';
import Header from './subheader'
class SuperHeader extends Component {
    constructor(props) {
        super(props)
        
    }
    componentDidMount() {
    }
    render() {
        const {header,banner,imageHeader,titleText,subTitleText} = style        
      return (
        <View style = {style.header}>
            <Swiper showsButtons={false} showsPagination={false} loop={false}
                ref = 'swiper'
            > 
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
                            this.refs.swiper.scrollBy(-1)
                    }}>
                        <View>
                            <Icon color='white' style = {{textAlign:'center',height:25,width:25,justifyContent:'center',alignItems:'center'}} size={25} name={'info'} />
                        </View>
                    </TouchableOpacity>
                    </View>
                    <View style = {{flex:1,justifyContent:'center'}}>
                        <TextInput placeholder={'SSID'} style = {{borderRadius:20,textAlign:'center',backgroundColor:'rgba(255,255,255,0.5)',borderBottomWidth:1,borderBottomColor:'white',width:width-40,height:35}}/>
                        <TextInput placeholder={'PASSWORD'} style = {{borderRadius:20,textAlign:'center',backgroundColor:'rgba(255,255,255,0.5)',borderBottomWidth:1,borderBottomColor:'white',width:width-40,height:35}}/>
                        <TextInput placeholder={'NAME DEVICE'} style = {{borderRadius:20,textAlign:'center',backgroundColor:'rgba(255,255,255,0.5)',borderBottomWidth:1,borderBottomColor:'white',width:width-40,height:35}}/>
                        <TouchableOpacity>
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