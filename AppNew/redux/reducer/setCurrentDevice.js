const defaultState = {
    macId:'default'
}
export default (state = defaultState,actions) => {
    switch(actions.type) {
        case 'setCurrentDevice': {
            return {
                macId:actions.value
            };
        }
        default:return state;
    }
}