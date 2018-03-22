/**
 * Created by zhuzihao on 2018/3/8.
 */


import {NetWorkManager} from "../../Tools/NetWork/NetWorkManager"
import {Types} from "../../ReduxReact/AppTypes"
import { fork,put,take } from 'redux-saga/effects';

function *updateMainData() {
    try {
        const res = yield NetWorkManager.GET("index/index").toPromise();
        if(res && res.success){
            yield put({
                type:Types.HomeTypes.MainDataUpdate,
                MainData:res.result
            })
        }
    }catch (err){
        console.log(err);
        return
    }
}

export function * MainDataManagerFunction() {
    while (true){
        let action = yield take(Types.HomeTypes.MainDataUpdate);
        if(action.MainData == null){
            yield fork(updateMainData);
        }
    }
}


export function *SwitchControl() {
    while (true){
        let action = yield take([Types.HomeTypes.SwitchGetGroupDetail,Types.HomeTypes.SwitchGroupChange]);
        switch (action.type){
            case Types.HomeTypes.SwitchGetGroupDetail:
                try {
                    yield put({
                        ...action,
                        type:Types.GroupType.oneGroupDetail
                    })
                }catch (err){
                    console.log("转发给Types.GroupType.oneGroupDetail失败",err)
                }
                break
            case  Types.HomeTypes.SwitchGroupChange:
                try{
                    let result = yield NetWorkManager.POST("group/change-status",{id:action.id,status:action.status ? 1 : 0}).toPromise()
                    console.log(result,190,action)
                    yield put({
                        type:Types.MessageType.textMessage,
                        content:result.success ? "修改成功" : "修改失败"
                    })
                    if(!result.success){
                        yield  put({
                            type:Types.HomeTypes.SwitchGroupChangeResult,
                            GroupSwitchResult:{/***不需要传递数据*/}
                        })
                    }
                }catch (err){
                    console.log("修改组 开关状态失败",err);
                }
                break
        }
    }
}

export function * BugMessagesFunction() {
    while (true){
        let action = yield take(Types.HomeTypes.BugMessages);
        switch (action.type){
            case Types.HomeTypes.BugMessages:
                try {
                    if(action.Messages == null){
                        console.log("BugMessages")
                        yield put({
                            type:Types.MessageType.loadingMessage
                        })
                        let result = yield  NetWorkManager.GET("message/fault-list",null,{rows:action.row,page:action.index}).toPromise()
                        console.log(result)
                        yield put({
                            type:Types.MessageType.MessageDismiss
                        });
                        yield put({
                            type:Types.HomeTypes.BugMessages,
                            Messages:result.success ? result.result :{}
                        });
                    }
                }catch (err){
                    console.log("加载BugMessages失败",err)
                }
            default:
                break
        }
    }
}


export function * SystemsMessagesFunction() {
    while (true){
        let action = yield take(Types.HomeTypes.SystemMessages);
        switch (action.type){
            case Types.HomeTypes.SystemMessages:
                try {
                    if(action.Messages == null){
                        console.log("SystemMessages")
                        yield put({
                            type:Types.MessageType.loadingMessage
                        })
                        let result = yield  NetWorkManager.GET("message/system-message",null,{rows:action.row,page:action.index}).toPromise()
                        console.log(result)
                        yield put({
                            type:Types.MessageType.MessageDismiss
                        });
                        yield put({
                            type:Types.HomeTypes.SystemMessages,
                            Messages:result.success ? result.result :{}
                        });
                    }
                }catch (err){
                    console.log("加载SystemMessages失败",err)
                }
            default:
                break
        }
    }
}