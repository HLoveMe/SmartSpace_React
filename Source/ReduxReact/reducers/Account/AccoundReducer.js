/**
 * Created by zhuzihao on 2018/3/1.
 */

import {AccountTypes} from "./AccountTypes"


export function AccountReducer(state={},action) {
    switch (action.type){
        case AccountTypes.inputUserInfo:
            let info = {...state};
            if(typeof action.name == "string"){
                info[action.name] = action.content;
            }else{
                let names = action.name;
                names.map((name,index)=>{
                    info[name] = action.content[index];
                })
            }
            return info;
            break;
        case AccountTypes.login:
            return state;
        case AccountTypes.getCode:
            return {...state,...action};
        default:
            return state;
    }
}
