/**
 * Created by zhuzihao on 2018/3/2.
 */
import {APPLoginRouter} from "../../Pages/AppRouter"
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
/**
 *  Navigation-- reducer
 * */
import {createReactNavigationReduxMiddleware, createReduxBoundAddListener} from 'react-navigation-redux-helpers';

export const accountMiddle = createReactNavigationReduxMiddleware("account",state=>{
    return state.AccountReducer
});
export const accountListener = createReduxBoundAddListener("account")


class _ReduxLoginNavigation extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        //dispatch 为Reducer的事件派送器
        // AccountReducer 为Reducer 的小state
        return (
            <APPLoginRouter navigation={
                addNavigationHelpers({
                    dispatch:this.props.dispatch,
                    state:this.props.AccountReducer,
                    addListener:accountListener,
                })
            }>
            </APPLoginRouter>
        )
    }
}

const  mapStateToProps = (state,props)=>{
    return {
        AccountReducer:state.AccountReducer,
    }
};

export const ReduxLoginNavigation = connect(mapStateToProps)(_ReduxLoginNavigation);


