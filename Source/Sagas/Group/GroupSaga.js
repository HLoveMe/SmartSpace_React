/**
 * Created by zhuzihao on 2018/3/9.
 */

import { fork } from 'redux-saga/effects';

import {DeviceBoxManager,DeviceGroupManger} from "./DeviceGroupManager"

export  function *GroupSaga() {
    yield fork(DeviceBoxManager);
    yield fork(DeviceGroupManger)
}