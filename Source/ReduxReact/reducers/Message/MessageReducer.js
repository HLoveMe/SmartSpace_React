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
 important:bool 是否一定要等其显示完成  才能显下一个消息  如果多个important消息
 }
 */
/**
 * MessageDismiss
 * type:
 * hiddenMessageInfo:{
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