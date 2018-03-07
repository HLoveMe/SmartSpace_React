/**
 * Created by zhuzihao on 2018/3/1.
 */

import {createStore,applyMiddleware,combineReducers} from "redux"
//合并来之 下级的Reducers

/**
 *  state 为Redux 初始state
 *  action 当前处理的action
 * */
import {AccountReducer} from "./reducers/Account/AccoundReducer"
import {MessageReducer} from "./reducers/Message/MessageReducer"
 function APPReducers(state={},action) {
    //进行差分
    return {
        AccountReducer:AccountReducer(state.AccountReducer,action),
        HomeReducer:{},
        MessageReducer:MessageReducer(state.MessageReducer,action)
    }
};

/**
 * 中间件注册
 * 生成Reducer 唯一Store
 * */
import logger from 'redux-logger'

import createSagaMiddleware from 'redux-saga'

export const SagaWare = createSagaMiddleware();

export default Store = createStore(APPReducers,applyMiddleware(SagaWare))
