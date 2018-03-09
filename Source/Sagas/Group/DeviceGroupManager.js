/**
 * Created by zhuzihao on 2018/3/9.
 */

import { take,fork,cancel,put } from 'redux-saga/effects';
import {Types} from "../../ReduxReact/AppTypes"
import {NetWorkManager} from "../../Tools/NetWork/NetWorkManager"

function *updateGroup() {
    try{
        let res = yield NetWorkManager.GET("equipment/index").toPromise();
        if(res && res.success){
            yield put({
                type:Types.GroupType.UpdateGroupData,
                devideBox:res.result
            })
        }
    }catch (err){
        console.log(err)
    }
}

//获取所有设备箱信息
export function * DeviceBoxManager() {
    let task;
    while (true){
        let action = yield take(Types.GroupType.UpdateGroupData);
        if(action.devideBox == null){
            try {if(task){cancel(task)}}catch (err){}
            task = yield fork(updateGroup)
        }
    }
}





//得到分组信息
function *getDeviceGroup() {
    try{
        yield put({
            type:Types.MessageType.loadingMessage,
        });
        let res = yield NetWorkManager.GET("group/index").toPromise();
        yield put({
            type:Types.MessageType.MessageDismiss
        });
        if(res && res.success){
            yield put({
                type:Types.GroupType.getGroupData,
                groupInfo:res.result.group
            })
        }

    }catch (err){
        console.log(err)
    }
}

export function *DeviceGroupManger() {
    let task;
    while (true){
        let action = yield take(Types.GroupType.getGroupData);
        if(action.groupInfo == null){
            try {if(task){cancel(task)}}catch (err){}
            task = yield fork(getDeviceGroup)
        }
    }
}