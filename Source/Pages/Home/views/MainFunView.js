/**
 * Created by zhuzihao on 2018/2/27.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,Image
} from 'react-native';
import PropTypes from 'prop-types';
import {colors} from "../../../Tools/colors"
const MainFunStyle = StyleSheet.create({
   container:{
       flexDirection:"column",
       backgroundColor:colors.bkcolor
   },
    content:{

        flex:1,
        margin:5,
        borderRadius:4,
        padding:4,
        shadowOffset:{ width:2, height:2 },
        shadowColor:"#666666",
        shadowRadius:10,
        shadowOpacity:0.5,
        backgroundColor:"white",
    },
    contentGroup:{
        flex:1,
        flexDirection:"row",
    },
    contentPart:{
        flex:1,
    },
    PartTop:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        marginTop:15
    },
    PartBottom:{
        // backgroundColor:"blue",
        textAlign:"center",
        paddingBottom:10
    },
    PartImage:{
        position:"absolute",
    }
});

export class MainFunView extends  Component{
    infos = [
        [
            {name:"开关控制",icon:require("../../../../images/Home/main_0.png")},
            {name:"定时设置",icon:require("../../../../images/Home/main_1.png")},
            {name:"用电统计",icon:require("../../../../images/Home/main_2.png")},
        ],[ {name:"故障报修",icon:require("../../../../images/Home/main_3.png")},
            {name:"系统消息",icon:require("../../../../images/Home/main_4.png")},
            {name:"购电",icon:require("../../../../images/Home/main_5.png")}]
    ];
    constructor(props) {
        super(props);
    }
    _renderItems = ()=>{
        this.infos.map((group)=>{
           return group.map((one)=>{
               return
           })
        });
    }
    render(){
        return (
            <View style={[MainFunStyle.container,{height:this.props.height}]}>
                <View style={MainFunStyle.content}
                >
                    {
                        this.infos.map((group,index)=>{
                            return (
                                <View style={MainFunStyle.contentGroup} key={"key_"+index}>
                                    {
                                        group.map((one,a)=>{
                                            return (
                                                <View style={MainFunStyle.contentPart} key={a}>
                                                    <View style={MainFunStyle.PartTop}>
                                                        <Image style={MainFunStyle.PartImage} source={one.icon}></Image>
                                                    </View>
                                                    <Text style={MainFunStyle.PartBottom}>{one.name}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

}
MainFunView.propTypes = {
    height:PropTypes.number.isRequired
}
