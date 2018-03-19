/**
 * Created by zhuzihao on 2018/3/14.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {connect} from "react-redux"
import PXHandle from "../../../Tools/PXHandle"
import fecha from "fecha"
import {withNavigation} from "react-navigation"
const  styles = StyleSheet.create({
   container:{
       flex:1,
       marginHorizontal:12,
       marginVertical:10,
       backgroundColor:"white",
       borderRadius:6
   },
    nameCon:{
        marginTop:PXHandle.PXHeight(9),
        flexDirection:"row"
    },
    deviceName:{
        textAlign:"right",
        color:"#333333",
        fontSize:20,
        flex:1.3,
        fontWeight:"bold"
    },
    change:{
        flex:1,
        justifyContent:"center",
    },
    ele:{
        flex:1,
        height:PXHandle.PXHeight(120),
    },
    eleNum:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    eleNumC:{
        color:"#F54816",
        fontSize:37,
        fontWeight:"bold"
    },
    eleText:{
        height:20,
        textAlign:"center"
    },
    time:{
        position:"absolute",
        bottom:10,
        width:"100%",
        textAlign:"center",
        color:"#999999",
        fontSize:14
    }
});

class _ElectrictyBoxView extends Component{
    constructor(props) {
        super(props);
    }
    _exchangeDefaultDevice = ()=>{
        if(this.props.device != null){
            this.props.navigation.navigate("deviceEX",{id:this.props.device.equipment_id})
        }
    }
    _getPrice = ()=>{
        info = this.props.main;
        if(info != null && info.status != null){
            return info.status.meterm * info.price;
        }
        return "0"
    }
    _getEleNumber = ()=>{
        info = this.props.main;
        if(info != null && info.status != null){
            return info.status.meterm;
        }
        return "0"
    }
    render(){
        return  (
            <View {...this.props} style={styles.container}>
                <View style={styles.nameCon}>
                    <Text style={styles.deviceName}>
                        {this.props.device.name}
                    </Text>
                    <View style={styles.change}>
                        <Text style={{color:"blue",paddingHorizontal:10,
                            width:60}} onPress={this._exchangeDefaultDevice}>
                            更改
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection:"row",marginTop:40}}>
                    <View style={[styles.ele]}>
                        <View style={styles.eleNum}>
                            <Text style={styles.eleNumC}>
                                {
                                    this._getPrice()
                                }
                            </Text>
                        </View>
                        <Text style={styles.eleText}>电费(¥)</Text>
                    </View>
                    <View style={[styles.ele]}>
                        <View style={styles.eleNum}>
                            <Text style={styles.eleNumC}>
                                {
                                    this._getEleNumber()
                                }
                            </Text>
                        </View>
                        <Text style={styles.eleText}>用电量(KW.h)</Text>
                    </View>
                </View>
                <Text style={styles.time}>更新时间:{fecha.format(new Date(),"YYYY-MM-DD hh:mm")}</Text>
            </View>
        )
    }
}

const mapStateToProps =(state,props)=>{
    return {...props,device:props.device || {} , main:props.main || {}}
};

export default ElectrictyBoxView = withNavigation(connect(mapStateToProps)(_ElectrictyBoxView))