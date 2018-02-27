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

const styles = StyleSheet.create({
    page:{flex:1,backgroundColor:"red"},
    distribution:{
        height:PXHandle.PXHeight(359),
        backgroundColor:colors.navbar
    },
    funcV:{
        height:PXHandle.PXHeight(195),
        backgroundColor:"red",
    }
});
export default class HomeFunPage extends Component{
    static navigationOptions = {
        headerTitle:"SmartSpace",
        tabBarLabel:"首页"
    };
    constructor(props) {
        super(props);

    }
    render(){
        return (
            <View style={styles.page}>
                <ElectricityDistributionView style={styles.distribution}>

                </ElectricityDistributionView>
                <MainFunView style={styles.funcV}>

                </MainFunView>
            </View>
        )
    }
}