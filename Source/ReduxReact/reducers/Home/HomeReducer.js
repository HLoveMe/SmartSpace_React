/**
 * Created by zhuzihao on 2018/3/1.
 */
import {Types} from "../../AppTypes"

export function  HomeReducer(state,action) {
    switch (action.type){
        case Types.HomeTypes.MainDataUpdate:
            return {...state,...action};
        default:
            return state;
    }
    return state
}