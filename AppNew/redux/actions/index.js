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
export {loading,disconnect,changeAppState,onOrOffAnimating}
