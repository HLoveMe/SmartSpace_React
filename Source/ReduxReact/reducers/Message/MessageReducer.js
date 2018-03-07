/**
 * Created by zhuzihao on 2018/3/5.
 */

import {MessageType} from "./MessageType"


/**
 * Message
 {
 type:Types.MessageType.Message,
 count:conunt, option
 content:action.content,
 duration:
 delay:0 no use
 }
 */
/**
 * MessageDismiss
 * type:
 * hiddenMessageInfo:{
 *  delay:0
 * }
 *
 * */
/**消息转发由Saga转发*/
export function MessageReducer(state={},action) {
    switch (action.type){
        case MessageType.Message:
            return {...state,...action};
        default:
            return state;
    }
}