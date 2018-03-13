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
import MainDataManager from "./MainDataManager"
import ElectricityBoxManager from "../Group/ElectricityBoxManager"
import {MainElectryInfo} from "./models/MainElectryInfo"
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
        this.state = {data:new MainElectryInfo(null,null,null)}
    }

    componentDidMount(){
        this.startUpdate();
        //首页数据  MainDevideData
        let mainObs = MainDataManager.dataSubject.asObservable();
        //默认数据  {equipment_id:6,is_default:1,name:"设备6"
        let current = ElectricityBoxMananger.currentSubject.asObservable();
        //
        let mqtt = Observable.of(null);
        mainObs.combineLatest(current,mqtt,(main,devide,mqtt)=>{
            return new MainElectryInfo(main,devide,mqtt)
        }).subscribe((data)=>{
            this.setState({data})
        })
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
                <ElectricityDistributionView data = {this.state.data} style={styles.distribution} height={PXHandle.PXHeight(359)}>

                </ElectricityDistributionView>
                <MainFunView height={PXHandle.PXHeight(195)}>

                </MainFunView>
            </View>
        )
    }
}

/**
 *
 history
 :
 (24) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
 id
 :
 6
 is_primary
 :
 1
 meter_fee
 :
 {peak: {…}, normal: {…}, valley: {…}}
 name
 :
 "MT419B5B56"
 price
 :
 2
 serial_number
 :
 "MT419B5B56"
 status
 :
 {power: 0, temp: 28, meterd: 0.000203, leakage: 0, meterm: 0.000203, …}
 today_fee
 :
 0
 yesterday_fee
 :
 0
 * */

/**
 * equipment_id
 :
 6
 is_default
 :
 1
 name
 :
 "设备6"
 *
 * */