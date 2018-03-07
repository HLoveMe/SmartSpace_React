/**
 * Created by zhuzihao on 2018/3/5.
 */
import { fork } from 'redux-saga/effects';
import {AccountSaga} from "./AccountSaga"
import {HomeSage} from "./HomeSaga"
import {MessageSage} from "./MessageSaga"

export default function*  RootSaga() {
    yield fork(MessageSage);
    yield fork(AccountSaga);
    yield fork(HomeSage);
}