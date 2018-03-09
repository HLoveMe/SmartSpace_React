/**
 * Created by zhuzihao on 2018/3/5.
 */


import { take,call,put} from 'redux-saga/effects';
import {Types} from "../../ReduxReact/AppTypes"


export function* MessageSage() {
    let conunt = 1;
    while (true){
        const action = yield take([Types.MessageType.loadingMessage,
            Types.MessageType.textMessage,
            Types.MessageType.loadTextMessage,
            Types.MessageType.MessageDismiss,
        ]);
        conunt +=1;
        if(action.type == Types.MessageType.MessageDismiss){
            yield put({
                type:Types.MessageType.Message,
                hiddenMessageInfo:{
                    delay:0
                }
            })
        }else{
            yield put({
                type:Types.MessageType.Message,
                showMessageInfo:{
                    type:action.type,
                    count:conunt,
                    content:action.content,
                    duration:action.duration || 0.75,
                    important:action.important || false
                }
            })
        }

    }
}