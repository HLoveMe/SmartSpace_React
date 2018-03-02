/**
 * Created by zhuzihao on 2018/2/27.
 */
import React, { Component } from 'react';
import {StyleSheet,Image} from 'react-native';
import { StackNavigator,TabNavigator } from "react-navigation"
import {colors} from "../Tools/colors"
import UserLoginPage from "./Account/UserLoginPage"

const APPStyle = StyleSheet.create({
    navigaTitle:{
        color:"white",
        fontSize:18
    },
    navigaHeader:{
        backgroundColor: colors.navbar
    }
});

SmartNavigater = (config,options)=>{
    return StackNavigator(config,{
        navigationOptions:{
            headerStyle:APPStyle.navigaHeader,
            headerTitleStyle:APPStyle.navigaTitle,
            headerBackTitle:null,
            ...options.navigationOptions
        }
    })
};
export const APPTabNavRouter = TabNavigator({
    Home:{
        screen:SmartNavigater({
            home:{getScreen:()=>{return require("./Home/HomeFunPage").default}}
        },{
            navigationOptions:{
                tabBarIcon:(options)=>{
                    let source = null;
                    if(!options.focused){
                        source = require("../../images/Home/home_nor.png");
                    }else{
                        source = require("../../images/Home/home.png");
                    }
                    return (<Image source={source}></Image>)
                }
            }
        })
    },
    Group:{
        screen:SmartNavigater({
            home:{getScreen:()=>{return require("./Group/ElectricityGroupPage").default}}
        },{
            navigationOptions:{
                tabBarIcon:(options)=>{
                    let source = null;
                    if(!options.focused){
                        source = require("../../images/Home/Distribution_nor.png");
                    }else{
                        source = require("../../images/Home/Distribution.png");
                    }
                    return (<Image source={source}></Image>)
                }
            }
        })
    },
    Electricity:{
        screen:SmartNavigater({
            home:{getScreen:()=>{return require("./Electricity/ElectricityInfoPage").default}}
        },{
            navigationOptions:{
                tabBarIcon:(options)=>{
                    let source = null;
                    if(!options.focused){
                        source = require("../../images/Home/Electricity_nor.png");
                    }else{
                        source = require("../../images/Home/Electricity.png");
                    }
                    return (<Image source={source}></Image>)
                }
            }
        }),
    },
    AppConfig:{
        screen:SmartNavigater({
            home:{getScreen:()=>{return require("./AppConfig/AppConfigPage").default}}
        },{
            navigationOptions:{
                tabBarIcon:(options)=>{
                    let source = null;
                    if(!options.focused){
                        source = require("../../images/Home/User_nor.png");
                    }else{
                        source = require("../../images/Home/User.png");
                    }
                    return (<Image source={source}></Image>)
                }
            }
        }),
    }
},{

});



export const APPLoginRouter = SmartNavigater({
    login:{
        screen:UserLoginPage,
        navigationOptions:{
            title:"登入",
        }
    },
    register:{
        getScreen:()=>{
            return require("./Account/UserRegisterPage").default
        },
        navigationOptions:{
            title:"注册"
        }
    }
},{});

