import {Client, Message} from 'react-native-paho-mqtt';

export default (state = null,actions) => {
    switch(actions.type) {
        case 'Init': {
            // const myStorage = {
            // setItem: (key, item) => {
            //     myStorage[key] = item;
            // },
            // getItem: (key) => myStorage[key],
            // removeItem: (key) => {
            //     delete myStorage[key];
            // },
            // };
            // var client = new Client({uri: 'ws://iot.eclipse.org:80/ws', clientId: 'clientId', storage: myStorage});
            return "HAHA";
        }
        default:return state;
    }
}