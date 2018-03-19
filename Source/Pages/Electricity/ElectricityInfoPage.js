/**
 * Created by zhuzihao on 2018/2/27.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import ElectrictyBoxView from "./views/ElectrictyBoxView"
import EleYearHistoryView from "./views/EleYearHistoryView"
import PXHandle from "../../Tools/PXHandle"
import {colors} from "../../Tools/colors"
import ElectricityBoxMananger from "../Group/ElectricityBoxManager"
import MainDataManager from "../Home/MainDataManager"
const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.bkcolor,
        flex:1
    },
    box:{
        height:PXHandle.PXHeight(230)
    },
    history:{
        flex:1,
        backgroundColor:"white"
    }
})
export default class ElectricityInfoPage extends Component{
    static navigationOptions = {
        title:"用电"
    };
    constructor(props) {
        super(props);
        this.state = {device:null,main:null};
    }
    componentWillMount(){
        ElectricityBoxMananger.currentSubject.subscribe((device)=>{
            this.setState({device})
        })
        MainDataManager.dataSubject.subscribe((main)=>{
            this.setState({main})
        })
    }
    render(){
        return (
            <View style={styles.container}>
                <ElectrictyBoxView  style={styles.box} device={this.state.device} main={this.state.main}>

                </ElectrictyBoxView>
                <EleYearHistoryView style={styles.history}>

                </EleYearHistoryView>
            </View>
        )
    }

}