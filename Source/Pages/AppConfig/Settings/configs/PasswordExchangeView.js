/**
 * Created by zhuzihao on 2018/1/17.
 */
import React, { Component } from 'react';
import { StyleSheet, View,Image ,TouchableOpacity,Text} from 'react-native';
import PasswordInputView from "../views/PasswordInputView"
import Button from 'apsl-react-native-button'
import PXHandle from "../../../../Tools/PXHandle"
let PassView = null;
const PasswordStyle = StyleSheet.create({
    backButton:{
        borderWidth:0,
        width:40,
        height:"100%",
        marginLeft:0,
        marginTop:2,
        justifyContent:"center",
        alignItems:"center"
    },
    input:{
        width:"100%",
        height:44
    },
    finish:{
        width:PXHandle.PXWidth(327),
        height:PXHandle.PXHeight(40),
        marginLeft:PXHandle.PXWidth(24),
        borderWidth:0,
        backgroundColor:"#1E8CF0",
        marginTop:10
    }
})
export  class PasswordExchangeView extends Component{
    static  navigationOptions = {
        title:"密码修改",
        headerLeft:(
            <TouchableOpacity onPress={()=>{
                    PassView.props.navigation.goBack()
            }}
                              style = { PasswordStyle.backButton }
            >
                <Image source={require("../../../images/back.png")}>

                </Image>
            </TouchableOpacity>
        ),
        gesturesEnabled:false
    }
    constructor(ops){
        super(ops)
        PassView = this
        this.state ={
            oldP:"",
            newP:"",
            reP:""
        }
    }
    render(){
        return (
            <View style={{marginTop:8,backgroundColor:"white"}}>
                <PasswordInputView style={ PasswordStyle.input }
                                   placeholder={"旧密码"}
                                   value={this.state.oldP}
                                   onChangeText = { (oldP)=>{
                                       this.setState({oldP})
                                   }}
                ></PasswordInputView>
                <PasswordInputView style={ PasswordStyle.input }
                                   placeholder={"新密码"}
                                   value={this.state.newP}
                                   onChangeText = { (newP)=>{
                                       this.setState({newP})
                                   }}
                ></PasswordInputView>
                <PasswordInputView style={ PasswordStyle.input }
                                   placeholder={"确认新密码"}
                                   value={this.state.reP}
                                   onChangeText = { (reP)=>{
                                       this.setState({reP})
                                   }}
                ></PasswordInputView>
                <Button style = {PasswordStyle.finish}
                        textStyle={{color:"white"}}
                >
                    完成
                </Button>
            </View>
        )
    }
}