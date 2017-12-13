import {combineReducers} from 'redux';
import reducer1 from './reducer1'
import reducer2 from './reducer2'
import reducer3 from './reducer3'
import currentDevice from './setCurrentDevice'
import allData from './allData'
export default combineReducers({
    visibleLoadingView:reducer1,
    appState:reducer2,
    animating:reducer3,
    currentDevice,
    allData
    
})