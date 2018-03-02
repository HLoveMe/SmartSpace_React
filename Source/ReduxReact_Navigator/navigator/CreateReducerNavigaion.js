/**
 * Created by zhuzihao on 2018/3/2.
 */

import { connect } from 'react-redux'
import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import {createReactNavigationReduxMiddleware, createReduxBoundAddListener} from 'react-navigation-redux-helpers';


const CreateReducerNavigation = (Navigation,key,Reducer)=>{
    let addListener =  createReduxBoundAddListener(key);
    function mapStateToProps(state,props) {
        let reducer = {};
        reducer[Reducer] = state[Reducer];
        return reducer;
    }
    ReducerNAvigation = (props) => {
        return (
            <Navigation navigation = {
                addNavigationHelpers({
                    dispatch:props.dispatch,
                    state:props[Reducer],
                    addListener
                })
            }>

            </Navigation>
        )
    };
  return connect(mapStateToProps)(ReducerNAvigation)
};

const CreateReduceNavigateMiddle = (key,Reducer)=>{
    return createReactNavigationReduxMiddleware(key,state=>{
        return state[Reducer]
    });
};

export {
    CreateReducerNavigation,
    CreateReduceNavigateMiddle
}

/***
 *
 * 简化包装导航器
 * 生成中间器
 * func APPReducers(state,action){
 *  return {
 *      AccountReducer:{....}
 *  }
 * }
 *
 * import {CreateReduceNavigateMiddle} from "./navigator/CreateReducerNavigaion"
 * export default Store = createStore(APPReducers,applyMiddleware(logger,thunk,CreateReduceNavigateMiddle("account","AccountReducer")))
 *
 * const ReducLoginNav = CreateReducerNavigation(APPLoginRouter,"account","AccountReducer")
 * <ReducLoginNav/>
 *
 *
 *
 *
 *
 * */


