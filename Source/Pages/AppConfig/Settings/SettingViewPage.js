/**
 * Created by zhuzihao on 2018/1/12.
 */

import React, { Component } from 'react';
import { StyleSheet, View,Image ,TouchableOpacity,Text,FlatList,AlertIOS} from 'react-native';
import { NativeModules,NativeEventEmitter} from 'react-native';
const { ReactVCManager,ReactUserManager,ReactParamsManager } = NativeModules;
import Button from 'apsl-react-native-button'
import PXHandle from "../../../Tools/PXHandle"
const SettingStyle = StyleSheet.create({
   container:{
       height:176,
       marginTop:9,
       backgroundColor:"white"
   },
    cellItem:{
       height:44,
        backgroundColor:"white"
    },
    cellText:{
        height:44,
        lineHeight:44,
        marginLeft:15
    },
    cellAssText:{
        height:44,
        lineHeight:44,
        right:10,
        position:"absolute"
    },
    out:{
        height:PXHandle.PXHeight(40),
        width:PXHandle.PXWidth(327),
        marginLeft:PXHandle.PXWidth(24),
        backgroundColor:"#1E8CF0",
        borderWidth:0,
        marginTop:15
    },
    backButton:{
        borderWidth:0,
        width:40,
        height:"100%",
        marginLeft:0,
        marginTop:2,
        justifyContent:"center",
        alignItems:"center"
    }
});

export  default class SettingViewPage extends React.PureComponent{
    static  navigationOptions = {
        title:"设置",
    }
    constructor(ops){
        super(ops);
        // let version = ReactParamsManager["CFBundleShortVersionString"];
        let version = "12.121.12"
        this.list = [
            {
                name:"修改密码",
                assist:0,
                content:""
            },
            {
                name:"关于我们",
                assist:0,
                content:""
            },{
                name:"软件版本",
                assist:1,
                content:`${version}`
            },{
                name:"固件版本",
                assist:1,
                content:`${version}`
            }
        ]
    }
    _renderItem = ({item,index})=>{
        return (
            <TouchableOpacity style = {SettingStyle.cellItem}
                              onPress = {()=>{
                                  if(index == 0){
                                      this.props.navigation.navigate("password")
                                  }
                              }}
            >
                <Text style={ SettingStyle.cellText }>
                    {
                        item.name
                    }
                </Text>
                {
                    item.assist == 0 ? (
                        <View style =  {{
                            position:"absolute",
                            top:0,
                            bottom:0,
                            right:10,
                            width:20,
                            justifyContent:"center",
                            alignContent:"center"
                        }}>
                            <Image
                                   style = {SettingStyle.cellAssImage}
                            >

                            </Image>
                        </View>
                    ) : (
                        <Text style = {SettingStyle.cellAssText}>{item.content}</Text>
                    )
                }
            </TouchableOpacity>
        )
    };
    _SeparatorComponent = ()=>{
      return (
          <View style = { {
              height:0.5,
              backgroundColor:"#E1E1E1",
              marginLeft:15
          } }>

          </View>
      )
    };
    render(){
        return (
            <View style = {{flex:1}}>
                <View style={SettingStyle.container }>
                    <FlatList
                              data={this.list}
                              extraData = {this.state}
                              renderItem = { this._renderItem }
                              keyExtractor={ (item,index)=>{
                                  return `${index}`
                              } }
                              ItemSeparatorComponent = { this._SeparatorComponent }

                    >
                    </FlatList>
                </View>
                <Button style = {SettingStyle.out}
                        textStyle={ {fontSize:18,color:"white"}}
                        activeOpacity = {0.5}
                        onPress={()=>{
                            AlertIOS.alert("确认退出",null,[
                                {
                                    text:"退出",
                                    type:"destructive",
                                    onPress:()=>{

                                    }
                                },{
                                    text:"取消"
                                }
                            ])
                        }}
                >
                    退出登入
                </Button>
            </View>

        )
    }
}


