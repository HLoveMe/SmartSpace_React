/**
 * Created by zhuzihao on 2018/3/5.
 */
import { fork } from 'redux-saga/effects';
import {AccountSaga} from "./Account/AccountSaga"
import {HomeSage} from "./Home/HomeSaga"
import {MessageSage} from "./message/MessageSaga"
import {GroupSaga} from "./Group/GroupSaga"
import {UserSaga} from "./App/UserSaga"

export default function*  RootSaga() {
    yield fork(MessageSage);
    yield fork(AccountSaga);
    yield fork(HomeSage);
    yield fork(GroupSaga);
    yield fork(UserSaga);
}