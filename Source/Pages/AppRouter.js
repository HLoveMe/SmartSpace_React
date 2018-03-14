/**
 * Created by zhuzihao on 2018/2/27.
 */
import React, { Component } from 'react';

import {StyleSheet,Image,View,Text,TouchableOpacity} from 'react-native';
import { StackNavigator,TabNavigator ,NavigationActions,TabBarBottom} from "react-navigation"
import {colors} from "../Tools/colors"
import UserLoginPage from "./Account/UserLoginPage"
import Store from "../ReduxReact/APPReducers"
import {Types} from "../ReduxReact/AppTypes"
import TabBar from "./TabsFactionary"

const APPStyle = StyleSheet.create({
    navigaTitle:{
        color:"white",
        fontSize:20
    },
    navigaHeader:{
        backgroundColor: colors.navbar
    }
});


let tabbarShowPage = "";
SmartNavigater = (config,options)=>{
    tabbarShowPage += Object.keys(config)[0] + "-";
    let _Navi= StackNavigator(config,{
        navigationOptions:({navigation})=>{
            let routeName = navigation.state.routeName;
            let tabBarVisible = tabbarShowPage.indexOf(routeName)>=0;
            return {
                headerStyle:APPStyle.navigaHeader,
                headerTitleStyle:APPStyle.navigaTitle,
                headerBackTitle:null,
                headerLeft:( <View style={{paddingLeft: 15}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../images/Home/back-icon.png')} style={{width: 20, height: 20, resizeMode: 'contain'}} />
                    </TouchableOpacity>
                </View>),
                ...options.navigationOptions,
                tabBarVisible
            }
        }
    });
    const  defaultGetStateForAction = _Navi.router.getStateForAction;
    _Navi.router.getStateForAction = (action,state)=>{
        if(action.type == NavigationActions.BACK){
            Store.dispatch({
                type:Types.MessageType.MessageDismiss,
            })
        }
        return defaultGetStateForAction(action,state);
    };
    return _Navi;
};
export const APPTabNavRouter = TabNavigator({
    Home:{
        screen:SmartNavigater({
            home:{
                getScreen:()=>{return require("./Home/HomeFunPage").default},
                path:"home/",
                navigationOptions:{
                    headerLeft:null
                }
            }
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
            group:{
                getScreen:()=>{return require("./Group/ElectricityGroupPage").default},
                path:"group/",
                navigationOptions:{
                    headerLeft:null
                }
            },
            groupbox:{
                getScreen:()=>{return require("./Group/DistributionGroupBoxPage").default},
                path:"boxs/",
            },
            newgroup:{
                getScreen:()=>{return require("./Group/ElectricityGroupCreatePage").default}
            },
            groupaddbox:{
                getScreen:()=>{return require("./Group/GroupAddBoxPage").default}
            }
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
            elec:{
                getScreen:()=>{return require("./Electricity/ElectricityInfoPage").default},
                navigationOptions:{
                    headerLeft:null
                }
            }
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
            app:{
                getScreen:()=>{return require("./AppConfig/AppConfigPage").default},
                navigationOptions:{
                    headerLeft:null
                }
            },
            appSetting:{
                getScreen:()=>{return require("./AppConfig/Settings/SettingViewPage").default}
            }
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
    tabBarComponent:({jumpToIndex,...props})=>{
        return (
            <TabBarBottom
                {...props}
                jumpToIndex={index => {
                    jumpToIndex(index)
                }}
            >

            </TabBarBottom>
        )
    }
});



export const APPLoginRouter = SmartNavigater({
    login:{
        screen:UserLoginPage,
        path:"login",
        navigationOptions:{
            title:"登入",
            headerLeft:null,
        }
    },
    register:{
        getScreen:()=>{
            return require("./Account/UserRegisterPage").default
        },
        navigationOptions:{
            title:"注册"
        }
    },
    registerPass:{
        getScreen:()=>{
            return require("./Account/UserRegisterNextPage").default
        },
    }
},{});

