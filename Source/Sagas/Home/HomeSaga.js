/**
 * Created by zhuzihao on 2018/3/5.
 */
import { fork} from 'redux-saga/effects';
import {MainDataManagerFunction,SwitchControl,BugMessagesFunction,SystemsMessagesFunction} from "./MainDataManager"


export  function* HomeSage() {
    yield fork(MainDataManagerFunction)
    yield fork(SwitchControl)
    yield fork(BugMessagesFunction)
    yield fork(SystemsMessagesFunction)
}