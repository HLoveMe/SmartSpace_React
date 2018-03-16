/**
 * Created by zhuzihao on 2018/3/9.
 */

import { take,fork,cancel,put,call,race } from 'redux-saga/effects';
import { delay } from 'redux-saga'
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

//分组 操作
//移除分组

function *removeDeviceGroup(id) {
    return new Promise((resolve, reject)=>{
        NetWorkManager.POST("group/del-group",{id}).subscribe((res)=>{
            resolve(res.success);
        },()=>{resolve(false)},()=>{resolve(true)})
    });
}



export function *DeviceGroupOperation() {
    while (true){
        let action = yield take([Types.GroupType.removeGroup,Types.GroupType.oneGroupDetail,Types.GroupType.createGroup]);
        switch (action.type){
            case Types.GroupType.removeGroup:
                try{
                    yield put({
                        type:Types.MessageType.loadingMessage,
                        content:"删除中。。。"
                    });
                    let state = yield NetWorkManager.POST("group/del-group",{id:action.re_group.id}).toPromise()
                    yield put({
                        type:Types.MessageType.textMessage,
                        content:state.success ? "删除成功" : "删除失败",
                        duration:0.75
                    });
                    yield put({
                        type:Types.GroupType.UpdateGroupData,
                    });
                    yield put({
                        type:Types.GroupType.getGroupData,
                    })
                    break;
                }catch (err){
                    console.log("移除组",err)
                }
            case Types.GroupType.oneGroupDetail:
                try{
                    let worker = yield NetWorkManager.GET("group/group-info",{id:action.id}).toPromise()
                    if(worker && worker.success){
                        yield put({
                            type:Types.GroupType.oneGroupDetail,
                            oneGroupDetail:{
                                editGroupInfo:worker.result
                            }
                        })
                    }else{
                        yield put({
                            type:Types.MessageType.textMessage,
                            content:"ID:"+ action.id +" 数据请求失败"
                        })
                    }
                }catch (err){
                    console.log("得到组信息错误2",err)
                }
                break;
            case Types.GroupType.createGroup:
                try{
                    yield put({
                        type:Types.MessageType.loadingMessage,
                        content:"创建中。。。"
                    });
                    let result = yield NetWorkManager.POST("group/add-group",{...action}).toPromise();
                    yield put({
                        type:Types.MessageType.textMessage,
                        content:result.success ? "创建成功" : "创建失败"
                    });
                    yield put({
                        type:Types.GroupType.createGroup,
                        createGroupResult:{
                            info:result
                        }
                    })
                }catch (err){
                    console.log("创建组 失败")
                }
                break;
            default:
                break;
        }
    }
}