/**
 * Created by zhuzihao on 2018/3/1.
 */

import {HomeTypes} from "./HomeTypes"

function SwitchControlReducer(state,action) {
    switch (action.type){
        case HomeTypes.SwitchGetGroupDetail:
            return {...state,...action};
            break
        case HomeTypes.SwitchGroupChange:
            return {...state,...action};
        default:
            return {...state,...action}
    }
    return state;
}
function BugsMessageReducer(state={},action) {
    switch (action.type){
        default:
            return {...state,...action}
    }
    return state
}

function SystemMessagesReducer(state={},action) {
    switch (action.type){
        default:
            return {...state,...action}
    }
    return state
}


export function  HomeReducer(state = {},action) {
    let SwitchControl = SwitchControlReducer(state.SwitchControl,action);
    let BugMessages = BugsMessageReducer(state.BugMessages,action);
    let SystemMessages = SystemMessagesReducer(state.SystemMessages,action);
    switch (action.type){
        case HomeTypes.MainDataUpdate:
            return {...state,...action,SwitchControl,BugMessages,SystemMessages};
        default:
            return {...state,SwitchControl,BugMessages,SystemMessages};
    }
    return {...state,SwitchControl,BugMessages,SystemMessages}
}