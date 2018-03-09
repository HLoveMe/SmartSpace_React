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
import {HomeReducer} from "./reducers/Home/HomeReducer"
import {GroupReducer} from "./reducers/Group/GroupReducer"
import {USerReducer} from "./reducers/App/USerReducer"
 function APPReducers(state={},action) {
    //进行差分
    return {
        AccountReducer:AccountReducer(state.AccountReducer,action),
        HomeReducer:HomeReducer(state.HomeReducer,action),
        MessageReducer:MessageReducer(state.MessageReducer,action),
        GroupReducer:GroupReducer(state.GroupReducer,action),
        USerReducer:USerReducer(state.USerReducer,action),
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
