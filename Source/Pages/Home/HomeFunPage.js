/**
 * Created by zhuzihao on 2018/2/27.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import PXHandle from "../../Tools/PXHandle"
import {colors} from "../../Tools/colors"
import ElectricityDistributionView from "./views/ElectricityDistributionView"
import {MainFunView} from "./views/MainFunView"
import Store from "../../ReduxReact/APPReducers"
import {Types} from "../../ReduxReact/AppTypes"
import watch from 'redux-watch'
import {Observable} from "rxjs/Rx"
const styles = StyleSheet.create({
    page:{flex:1},
    distribution:{
        backgroundColor:colors.navbar,
    },
});
export default class HomeFunPage extends Component{
    static navigationOptions = {
        headerTitle:"SmartSpace",
        tabBarLabel:"首页"
    };
    constructor(props) {
        super(props);
        // 第一次数据加载在index.ios.js
        Store.subscribe(watch(Store.getState,"HomeReducer.MainData")((_new)=>{
            console.log(_new);

            this._updateUI(_new);
        }));
        this.startUpdate();
    }
    _updateUI = (data)=>{

    };
    componentDidMount(){
    }

    //更新数据首页
    startUpdate =()=>{
        let hour_s = 3600000;
        let data = new Date();
        let start = hour_s - (Date.parse(data) % hour_s);
        //定时任务
        Observable.timer(start,hour_s + 10000).subscribe(()=>{
            console.log(12121)
            Store.dispatch({
                type:Types.HomeTypes.MainDataUpdate
            })
        })
    };
    render(){
        return (
            <View style={styles.page}>
                <ElectricityDistributionView style={styles.distribution} height={PXHandle.PXHeight(359)}>

                </ElectricityDistributionView>
                <MainFunView height={PXHandle.PXHeight(195)}>

                </MainFunView>
            </View>
        )
    }
}