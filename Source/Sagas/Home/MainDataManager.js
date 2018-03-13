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
