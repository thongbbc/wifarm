import {Client, Message} from 'react-native-paho-mqtt';
function initMQTT () {
    const myStorage = {
        setItem: (key, item) => {
            myStorage[key] = item;
        },
        getItem: (key) => myStorage[key],
        removeItem: (key) => {
            delete myStorage[key];
        },
    };
    client = new Client({uri: 'ws://iot.eclipse.org:80/ws', clientId: 'clientId', storage: myStorage});
    return client;
}
function sendGetAllData(client) {
    var json = {
        macid:'ESP',
        data:'',
        func:1
    }
    const message = new Message(JSON.stringify(json));
    message.destinationName = 'Thong';
    client.send(message);
}
export {initMQTT,sendGetAllData};