import React from 'react';
import {Dimensions} from 'react-native';
const text = {
    fontFamily:'AvenirNext',
    sizeTitle:15,
    sizeSubTitle:10,
    fontFamily:'FontAwesome',
}
const topicSub = (macId) => {
    return `${macId}/slave`
}
const topicSend = (macId) => {
    return `${macId}/master`
}
const {width,height} = Dimensions.get('window')
export {text,width,height,topicSend,topicSub};