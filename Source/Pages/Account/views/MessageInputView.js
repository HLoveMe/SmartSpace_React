/**
 * Created by zhuzihao on 2018/2/28.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,Image,TextInput,TouchableOpacity
} from 'react-native';
import Button from 'apsl-react-native-button'
import PXHandle from "../../../Tools/PXHandle"
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
        borderBottomWidth:1
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
    }
});
export class MessageInputView extends Component{

    constructor(props) {
        super(props);
        this.state = {
            icon:require("../../../../images/Account/iphone_icon.png"),
            secureTextEntry:this.props.type == InputType.Password || this.props.type == InputType.RePassword,
            placeString:""
        }
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
                    this.props.type == InputType.Code ? <Button ref="codeButton">
                        Hello
                    </Button> : null
                }
            </View>
        )
    }
}

