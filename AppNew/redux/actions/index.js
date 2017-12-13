loading =  (check) => {
    if (check)
        return {
            type:'Loading'
        }
    else {
       return {
            type:'UnLoading'
        } 
    }
}
disconnect = () => {
    return {
        type:'Disconnect'
    }
}
changeAppState = (appState) => {
    return {
        type:'ChangeAppState',
        value:appState
    }
}
onOrOffAnimating = (state) => {
    if (state == true)
        return {
            type : 'on',
            value:true
        } 
    else 
        return {
            type : 'off',
            value:false
        }
}
setCurrentDevice = (device) => {
    return {
        type:'setCurrentDevice',
        value:device
    }
}
setData = (TE_01=null,WL_01=null,RL_01=null,RL_02=null) => {
    if (TE_01 != null)
    return {
        type:'setData',
        TE_01
    }
    if (WL_01 != null) 
    return {
        type:'setData',
        WL_01
    }
    if (RL_01 != null) 
    return {
        type:'setData',
        RL_01
    }
    if (RL_02 != null) 
    return {
        type:'setData',
        RL_02
    }
}
export {
    setData
    ,loading,disconnect,changeAppState,onOrOffAnimating,setCurrentDevice}
