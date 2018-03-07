/**
 * Created by zhuzihao on 2018/2/28.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,Image,TextInput,TouchableOpacity
} from 'react-native';
import {Observable} from "rxjs/Rx"
import Button from 'apsl-react-native-button'
import PXHandle from "../../../Tools/PXHandle"
import {colors} from "../../../Tools/colors"
import {NetWorkManager} from "../../../Tools/NetWork/NetWorkManager"
import PropTypes from 'prop-types';
const InputType = {
    Account:1,
    Password:2,
    RePassword:3,
    Iphone:4,
    Code:5
};
const  style = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        justifyContent:"space-between",
        borderBottomColor:"#999999",
        borderBottomWidth:1,

    },
    icon:{
        // flex:1,
        height:PXHandle.PXHeight(25),
        width:PXHandle.PXHeight(25),
    },
    input:{
        flex:1,
        height:"100%",
        paddingHorizontal:10
    },
    accIcon:{
        height:PXHandle.PXHeight(12),
        width:PXHandle.PXHeight(20),
        marginLeft:5
    },
    codeButtonC:{
        // backgroundColor:"red",
        height:"100%",
        paddingLeft:60,
        borderBottomColor:"white",
        borderBottomWidth:1,
        marginTop:2,
        paddingRight:5,
    },
    codeButton:{
        height:"100%",
        minWidth:120,
        borderColor:"#999999",
        borderRadius:0,
        backgroundColor:colors.navbar
    }
});
import Store from "../../../ReduxReact/APPReducers"
import {Types} from "../../../ReduxReact/AppTypes"
export class MessageInputView extends Component{
    codeDes = null;
    constructor(props) {
        super(props);
        this.state = {
            icon:require("../../../../images/Account/iphone_icon.png"),
            secureTextEntry:this.props.type == InputType.Password || this.props.type == InputType.RePassword,
            placeString:"",
            isDisabled:false,
            codeText:"获取验证码"
        }
    }
    _pushCode=()=>{
        let iphone  = Store.getState().AccountReducer.iphone;
        if( iphone && iphone.length>=1){
            NetWorkManager.POST("sys/send-code",{mobile:iphone,type:1}).subscribe((res)=>{
                if(res.ok){

                }
            });
            this.setState({isDisabled:true});
            const section = 59;
            this.setState({codeText:"60s后重试"});
            this.codeDes = Observable.interval(1000).take(60).subscribe((res)=>{
                this.setState({codeText:section -  res  +"s后重试"});
            },null,()=>{
                this.setState({isDisabled:false,codeText:"获取验证码"});
            });
            return
        }
        Store.dispatch({
            type:Types.MessageType.textMessage,
            content:"正确输入手机号码",
            duration:0.75,
        });

    };
    componentWillUnmount(){
        this.codeDes && this.codeDes.unsubscribe()
    }
    componentWillMount(){
        if(this.props.type == InputType.Iphone){
            this.setState({
                icon:require("../../../../images/Account/iphone_icon.png"),
                placeString:"输入电话号码"
            })
        } else if(this.props.type == InputType.Account){
            this.setState({
                icon:require("../../../../images/Account/user_icon.png"),
                placeString:"请输入登入账号"
            })
        }else if(this.props.type == InputType.Password){
            this.setState({
                icon:require("../../../../images/Account/password_icon.png"),
                placeString:"请输入登入密码"
            })
        }else if(this.props.type == InputType.RePassword){
            this.setState({
                icon:require("../../../../images/Account/rePassword.png"),
                placeString:"输入确认密码"
            })
        }else if(this.props.type == InputType.Code){
            this.setState({
                icon:require("../../../../images/Account/code_icon.png"),
                placeString:"输入验证码"
            })
        }
    }
    render(){
        return (
            <View style={[style.container,this.props.style]}>
                <Image ref="icon" style={[style.icon]} source={this.state.icon}></Image>
                <TextInput ref="input" style={[style.input]} placeholder={this.state.placeString}
                           secureTextEntry={this.state.secureTextEntry}
                           onChange={(event) => {
                               Store.dispatch({
                                   type:Types.AccountTypes.inputUserInfo,
                                   name:this.props.name,
                                   content:event.nativeEvent.text
                               })

                           }}
                >

                </TextInput>

                {
                    !(this.props.type == InputType.Password || this.props.type == InputType.RePassword) ? null : <TouchableOpacity onPress={()=>{
                        this.setState({
                            secureTextEntry:!this.state.secureTextEntry
                        })
                    }}>
                        <Image ref="accIcon" style={style.accIcon} source={!this.state.secureTextEntry ? require("../../../../images/Account/password.png") : require("../../../../images/Account/password_nor.png")}>
                        </Image>
                    </TouchableOpacity>
                }
                {
                    this.props.type == InputType.Code ? <View style={style.codeButtonC}>
                        <Button ref="codeButton" style={style.codeButton} textStyle={{color:"white"}} isDisabled={this.state.isDisabled} onPress={()=>{this._pushCode()}}>{this.state.codeText}</Button>
                    </View> : null
                }
            </View>
        )
    }
}

MessageInputView.propTypes = {
    type:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired
}
