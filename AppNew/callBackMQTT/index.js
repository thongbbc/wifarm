import {Client, Message} from 'react-native-paho-mqtt';
import {topicSend,topicSub} from '../extensionHelper'

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
    const min = Math.ceil(0);
    const max = Math.floor(99999999999);
    const random = Math.floor(Math.random() * (max - min + 1)) + min; //The maximu
    client = new Client({uri: 'ws://cretacam.ddns.net:1883/ws', clientId: `clientId${random}`, storage: myStorage});
    // client = new Client({uri: 'ws://iot.eclipse.org:80/ws', clientId: 'clientId', storage: myStorage});
    return client;
}
function sendGetAllData(client,macId) {
    var json1 = {
        ID:macId,
        FUNC:'Data',
        ADDR:'TE_01',
    }
    var json2 = {
        ID:macId,
        FUNC:'Data',
        ADDR:'WL_01',
    }
    var json3 = {
        ID:macId,
        FUNC:'Data',
        ADDR:'RL_01',
    }
    var json4 = {
        ID:macId,
        FUNC:'Data',
        ADDR:'RL_02',
    }
    const jsonTE1 = JSON.stringify(json1)
    const jsonWL1 = JSON.stringify(json2)
    const jsonRL1 = JSON.stringify(json3)
    const jsonRL2 = JSON.stringify(json4)
    
    const messageTE1 = new Message(jsonTE1);
    const messageWL1 = new Message(jsonWL1);
    const messageRL1 = new Message(jsonRL1);
    const messageRL2 = new Message(jsonRL2);
    
    messageTE1.destinationName = topicSend(macId)
    messageWL1.destinationName = topicSend(macId)
    messageRL1.destinationName = topicSend(macId)
    messageRL2.destinationName = topicSend(macId)
    // setTimeout(()=>{         
        client.send(messageWL1);                    
        setTimeout(()=>{ 
            client.send(messageTE1);
            setTimeout(()=>{ 
                client.send(messageRL1);
                setTimeout(()=>{ 
                    client.send(messageRL2);            
                }, 200)             
            }, 200)             
        }, 200)    
    // },5000)
}
function analyzeData (data,control) {
    var parseData = JSON.parse(data)
    if (parseData.FUNC != 'Error') {
        if (parseData.FUNC == 'Data') {
            if (parseData.ADDR == 'TE_01') {
                control.setData(parseData.DATA)
            } else if (parseData.ADDR == 'WL_01') {
                control.setData(null,parseData.DATA)                
            }
        } else if (parseData.FUNC == 'Timer') {
            if (parseData.ADDR == 'RL_01') {
                const data = parseData.DATA=='100'?true:false
                control.setData(null,null,data)
            } else if (parseData.ADDR == 'RL_02') {
                const data = parseData.DATA=='100'?true:false                
                control.setData(null,null,null,data)                
            }
        } else if (parseData.FUNC == 'Ctrl') {
            
        }
      } else {
        alert("ERROR CAN NOT CONTROL")
      }
}
export {initMQTT,sendGetAllData,analyzeData};