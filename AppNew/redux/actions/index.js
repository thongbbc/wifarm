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
export {loading,disconnect,changeAppState}
