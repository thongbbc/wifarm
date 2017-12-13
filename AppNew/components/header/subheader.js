import React,{Component} from 'react';
import {Text,View,Dimensions,Image,TouchableOpacity,TouchableHighlight} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import reducer from '../../redux/reducer';
import {connect} from 'react-redux'
import * as action from '../../redux/actions'
class Header extends Component {
    constructor(props){
        super(props)
    }
    render(){
        const width = Dimensions.get('window').width;
        const {titleText,header,banner,imageHeader,subTitleText} = style;
    return (
        <LinearGradient colors={['#136a8a','#00bf8f']}
        start={{x: 0.0, y: 0}} end={{x: 1, y: 0}}
         style={header}>
        <View style={header}>
            <View style={banner}>
                <TouchableOpacity style={{height:30,width:30}} onPress={()=>{
                        this.props.onOrOffAnimating(!this.props.animating)
                }}>
                    <View>
                        <Icon color='white' style = {{left:5,height:30,width:30}} size={25} name={'bars'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{height:30,width:30}} onPress={()=>{
                     this.props.swipe.scrollBy(1)
                    }}>
                    <View>
                        <Icon color='white' style = {{right:0,height:30,width:30}} size={25} name={'cog'} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style = {{flex:1}}>
            <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
                <View style={{paddingTop:10,alignItems:'flex-start'}}>
                    <Image
                        style={imageHeader}
                        resizeMode='cover'
                        source={require('../../image/wifiIcon.png')}
                    />
                    <Text allowFontScaling={false} style={titleText}>inFarm</Text>
                </View>
                <View style = {{paddingBottom:20,width:this.width,alignItems:'center'}}>
                    <Text allowFontScaling={false} style={subTitleText}>connect  with  nature</Text>
                </View>
            </View>
            </View>
        </View>
        </LinearGradient>
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
export default connect (mapStateToProps,action)(Header);
