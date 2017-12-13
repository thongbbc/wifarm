const defaultState = {
    TE_01:'0',
    WL_01:'0',
    RL_01:false,
    RL_02:false    
}
export default (state = defaultState,actions) => {
    switch(actions.type) {
        case 'setData': {
            if (actions.TE_01) {
                return {
                    ...state,
                    TE_01:actions.TE_01,
                };
            }
            if (actions.WL_01) {
                return {
                    ...state,
                    WL_01:actions.WL_01
                };
            }
            if (actions.RL_01) {
                return {
                    ...state,
                    RL_01:actions.RL_01,
                };
            }
            if (actions.RL_02) {
                return {
                    ...state,
                    RL_02:actions.RL_02,
                };
            }
            
        }
        default:return state;
    }
}