/**
 * Created by zhuzihao on 2018/2/27.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {MessageInputView} from "./views/MessageInputView"
import Button from 'apsl-react-native-button'
import PXHandle from "../../Tools/PXHandle"
import {colors} from "../../Tools/colors"
import Store from "../../ReduxReact/APPReducers"
import {Types} from "../../ReduxReact/AppTypes"


const loginStyles = StyleSheet.create({
   loginPage:{
       flex:1,
       backgroundColor:"white"
   },
    titleLabel:{
        height:50,
        marginTop:45,
        textAlign:"center",
        lineHeight:50,
        color:"#E72F6D",
        fontSize:36
    },
    desclabel:{
        textAlign:"center",
        marginTop:3,
        color:"#999999",
        fontSize:14
    },
    inputV:{
        marginHorizontal:PXHandle.PXWidth(24),
        height:PXHandle.PXHeight(40),
        marginTop:PXHandle.PXHeight(70)
    },
    login:{
        borderWidth:0,
        backgroundColor:colors.navbar,
        marginTop:20,
        height:40,
        marginHorizontal:PXHandle.PXWidth(24),
        borderRadius:0
    },
    loginDesc:{
        marginHorizontal:PXHandle.PXWidth(24),

    },
    loginDescLabel:{
        position:"absolute",
        backgroundColor:"rgba(1,1,1,0)",
    }
});
export default class UserLoginPage extends Component{
    unsubscribe = null;
    constructor(props) {
        super(props);
        console.log(this.props)
    }
    componentDidMount(){
        this.unsubscribe = Store.subscribe(()=>{

        })
    }
    componentWillUnmount(){
        this.unsubscribe && this.unsubscribe();
    }
    render() {
        return (
            <View style={loginStyles.loginPage}>
                <Text style={loginStyles.titleLabel}>
                    SmartSpace
                </Text>
                <Text style={loginStyles.desclabel}>
                    配电安全管家
                </Text>
                <MessageInputView name="Account" type="1" style={loginStyles.inputV}></MessageInputView>
                <MessageInputView name="Password" type="2" style={[loginStyles.inputV,{marginTop:10}]}></MessageInputView>
                <Button style={loginStyles.login}
                        textStyle={{color:"white",fontSize:18}}
                        onPress={()=>{
                            let state = Store.getState();
                            let account = state.AccountReducer.Account || "";
                            let password = state.AccountReducer.Password || "";
                            if(account.length == 0 || password.length == 0){
                                Store.dispatch({
                                    type:Types.MessageType.textMessage,
                                    isLoading:false,
                                    content:"请输入用户名和密码",
                                    duration:0.75,
                                    delay:0
                                });
                                return
                            }
                            Store.dispatch({
                                type:Types.AccountTypes.login,
                                Account:account,
                                PassWord:password,
                            });
                        }}
                >
                    登陆
                </Button>
                <View style={loginStyles.loginDesc}>
                    <Text style={loginStyles.loginDescLabel}>忘记密码?</Text>
                    <Text style={[loginStyles.loginDescLabel,{textAlign:"right",right:0}]}>
                        还没注册?
                        <Text style={{color:colors.navbar}} onPress={()=>{
                            this.props.navigation.navigate("register");
                        }}>点击注册</Text>
                    </Text>
                </View>
            </View>
        )
    }
}

