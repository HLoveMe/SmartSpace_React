/**
 * Created by zhuzihao on 2018/3/9.
 */

import { GroupType } from "./GroupType"

export function GroupReducer(state={},action) {
    switch (action.type){
        case GroupType.UpdateGroupData:
            return {...state,...action};
        case GroupType.getGroupData:
            return {...state,...action};
        default:
            break
    }
    return state
}