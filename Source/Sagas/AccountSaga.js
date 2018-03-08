/**
 * Created by zhuzihao on 2018/3/5.
 */
import { take,fork,put,call} from 'redux-saga/effects';
import {Types} from "../ReduxReact/AppTypes"
import {NetWorkManager} from "../Tools/NetWork/NetWorkManager"
import {UserInfoManager} from "../Pages/Account/UserInfoManager"


function * UserRegister(action){
    //{type: "USer_Register", iphone: "123", code: "123", setPassword: "111", reSetPassword: "111"}
    return yield  UserInfoManager.registerUser(action.iphone,action.code,action.setPassword).toPromise();
}

function * getCode() {
    while(true){
        let action = yield take(Types.AccountTypes.getCode);
        let type = action.codeType;
        let mobile = action.iphone;
        let result = yield NetWorkManager.POST("sys/send-code",{mobile,type}).toPromise();
        yield put({
            type:Types.MessageType.textMessage,
            content:result.success ? "发送成功" : "发送失败"
        })
    }
}


function* UserOperation(){
    while (true){
        const action = yield take([
            Types.AccountTypes.login,Types.AccountTypes.outLogin,Types.AccountTypes.register
        ]);
        console.log(action)
        switch(action.type){
            case Types.AccountTypes.login:
                console.log("-=-=")
                try{
                    yield put({type:Types.MessageType.loadTextMessage,content:"登陆中。。。"});
                    const  success = yield UserInfoManager.loginUser(action.Account,action.PassWord).toPromise();
                    if(success){
                        yield put({type:Types.MessageType.textMessage,content: "登入成功"});
                    }

                }catch(err){
                    debugger
                    yield put({type:Types.MessageType.textMessage,content:err});
                }
                break;
            case Types.AccountTypes.outLogin:
                break;
            case Types.AccountTypes.register:
                console.log("注册 一次完成 不管能不能注册 ");
                try {
                    yield put({type:Types.MessageType.loadingMessage,content:"注册中..."});
                    const resuccess = yield call(UserRegister,action);
                    yield put({type:Types.MessageType.textMessage,content:resuccess ? "注册成功" : "注册失败"});
                    if(resuccess){
                        yield put({type:Types.MessageType.loadingMessage,content:"登录中..."});
                        const losuccess = yield UserInfoManager.loginUser(action.iphone,action.setPassword).toPromise()
                        yield put({type:Types.MessageType.textMessage,content:losuccess ? "登录成功" : "登录失败"});
                    }
                }catch (err){
                    yield put({type:Types.MessageType.textMessage,content:err});
                }
                break
            default:
                break;
        }
    }
}

export  function* AccountSaga() {
    yield fork(UserOperation);
    yield fork(getCode);

}