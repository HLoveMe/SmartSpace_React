/**
 * Created by zhuzihao on 2018/3/7.
 */


 Redux {
    export const  MessageType = {
        loadingMessage:"loadingMessage", //只有loading
        textMessage:"textMessage",//只有文字
        loadTextMessage:"loadTextMessage",//loading+文字
        MessageDismiss:"MessageDismiss",//移除消息
        Message:"Message",//消息  这个类型如果使用无效果
    };

    export function MessageReducer(state={},action) {
        switch (action.type){
            case MessageType.Message:
                return {...state,...action};
            default:
                return state;
        }
    }

}



Saga {
    export function* MessageSage() {
        let conunt = 1;
        while (true){
            const action = yield take([Types.MessageType.loadingMessage,Types.MessageType.textMessage,Types.MessageType.loadTextMessage]);
            console.log("消息",action);
            conunt +=1;
            yield put({
                type:Types.MessageType.Message,
                showMessageInfo:{
                    type:action.type,
                    count:conunt,
                    content:action.content,
                    duration:action.duration || 0.75
                }
            })
        }
    }
}

APP {
    Store.subscribe(watch(Store.getState,"MessageReducer.showMessageInfo")((_new,old,path)=>{
        switch (_new.type){
            case Types.MessageType.loadingMessage:
                //显示菊花
                break;
            case Types.MessageType.textMessage:

                break;
            case Types.MessageType.loadTextMessage:
                //显示菊花和文字

                break;
            default:
                break
        }

    }));

}


说明:
    2:Store.dispatch({
        type:"loadingMessage",
        content:"XXX",
        duration:0,75  //s
    })
    3:MessageReducer可知"loadingMessage/textMessage/loadTextMessage" 不会触发State的修改 也就没有任何反应
    4:Saga 已经监听了"loadingMessage/textMessage/loadTextMessage" 的action 此时消息有Saga接管
    5:Saga 接受到消息之后 就会进行消息的再次主装
        put({
            type:"Message",
            showMessageInfo:{
                这是携带的信息
            }
        })
    6:APP 中注册了对ShowMessageInfo的监听,并且MessageReducer 返回了新的State
    7:这样Message就被APP接受到了


那为啥不直接Redux 进行统一消息转发了,那当然是为了让Saga和Redux有统一的消息转发机制。
