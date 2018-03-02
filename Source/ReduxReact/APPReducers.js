/**
 * Created by zhuzihao on 2018/3/1.
 */

import {createStore,applyMiddleware,combineReducers} from "redux"
//合并来之 下级的Reducers

/**
 *  state 为Redux 初始state
 *  action 当前处理的action
 * */
 function APPReducers(state,action) {
    //进行差分
    return {
        AccountReducer:{},
        HomeReducer:{}
    }
};

/**
 * 中间件注册
 * 生成Reducer 唯一Store
 * */
import thunk from 'redux-thunk';
import logger from 'redux-logger'

export default Store = createStore(APPReducers,applyMiddleware(logger,thunk))
