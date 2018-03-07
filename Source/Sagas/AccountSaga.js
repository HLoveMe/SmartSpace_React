/**
 * Created by zhuzihao on 2018/3/5.
 */
import { take,fork,put,call} from 'redux-saga/effects';
import {Types} from "../ReduxReact/AppTypes"
import {NetWorkManager} from "../Tools/NetWork/NetWorkManager"


function * UserLogin({Account,PassWord}) {
    console.log(Account,PassWord)
    return true
}

function * getCode(url,type,iphone) {
    while(true){
        yield take(Types.AccountTypes.getCode);
        let result = yield NetWorkManager.POST(url,{mobile:iphone,type}).toPromise()
        put({
            type:Types.MessageType.textMessage,
            content:result.ok ? "发送成功" : "发送失败"
        })
    }
}

function* UserOperation(){
    while (true){
        const action = yield take([
            Types.AccountTypes.login,Types.AccountTypes.register
        ]);
        console.log(action)
        switch(action.type){
            case Types.AccountTypes.login:
                console.log("-=-=")
                yield put({type:Types.MessageType.loadTextMessage,content:"登陆中。。。"});
                const  success = yield call(UserLogin,action);
                yield put({type:Types.MessageType.textMessage,content:success ? "成功" : "失败"});
                break;
            case Types.AccountTypes.register:
                break;
            default:
                break;
        }
    }
}

export  function* AccountSaga() {
    yield fork(UserOperation)
}